extern crate alloc;

// Modules and imports
mod erc721;

use stylus_sdk::{
    block,
    evm,
    msg,
    prelude::*,
    alloy_primitives::{Address, U256},
};
use alloy_sol_types::sol;
use crate::erc721::{Erc721, Erc721Params};

// ─── Collection metadata ────────────────────────────────────────────
struct CertiChainParams;

impl Erc721Params for CertiChainParams {
    const NAME: &'static str = "CertiChain";
    const SYMBOL: &'static str = "CERT";
}

// ─── Storage layout ─────────────────────────────────────────────────
sol_storage! {
    /// On-chain certificate metadata, stored per token ID.
    pub struct CertificateData {
        string user_name;
        string course_name;
        uint256 completion_date;
    }

    #[entrypoint]
    struct CertiChain {
        #[borrow]
        Erc721<CertiChainParams> erc721;

        /// tokenId → certificate metadata
        mapping(uint256 => CertificateData) certificates;
    }
}

// ─── Events ─────────────────────────────────────────────────────────
sol! {
    event CertificateMinted(
        address indexed to,
        uint256 indexed token_id,
        string user_name,
        string course_name
    );
}

// ─── Public API ─────────────────────────────────────────────────────
#[public]
#[inherit(Erc721<CertiChainParams>)]
impl CertiChain {
    /// Mints a course-completion certificate as an NFT.
    ///
    /// Stores `user_name`, `course_name`, and `block.timestamp` on-chain.
    /// Returns the newly minted `tokenId`.
    ///
    /// Solidity selector: `mintCertificate(address,string,string)`
    pub fn mint_certificate(
        &mut self,
        to: Address,
        user_name: String,
        course_name: String,
    ) -> Result<U256, Vec<u8>> {
        // Grab the next token ID (erc721.mint will increment total_supply)
        let token_id = self.erc721.total_supply.get();

        // Standard ERC-721 mint → assigns ownership, increments supply
        self.erc721.mint(to)?;

        // Store certificate metadata
        let mut cert = self.certificates.setter(token_id);
        cert.user_name.set_str(&user_name);
        cert.course_name.set_str(&course_name);
        cert.completion_date.set(U256::from(block::timestamp()));

        // Emit event for indexers / frontend
        evm::log(CertificateMinted {
            to,
            token_id,
            user_name,
            course_name,
        });

        Ok(token_id)
    }

    /// Returns the certificate data for a given token.
    /// Reverts with `InvalidTokenId` if the token does not exist.
    ///
    /// Solidity selector: `getCertificate(uint256)`
    pub fn get_certificate(
        &self,
        token_id: U256,
    ) -> Result<(String, String, U256), Vec<u8>> {
        // Verify the token exists (reverts if burned / never minted)
        self.erc721.owner_of(token_id)?;

        let cert = self.certificates.getter(token_id);
        Ok((
            cert.user_name.get_string(),
            cert.course_name.get_string(),
            cert.completion_date.get(),
        ))
    }

    /// Basic self-mint (backward compatibility).
    /// Mints to `msg::sender()` without certificate metadata.
    pub fn mint(&mut self) -> Result<(), Vec<u8>> {
        let minter = msg::sender();
        self.erc721.mint(minter)?;
        Ok(())
    }

    /// Burns a token owned by `msg::sender()`.
    pub fn burn(&mut self, token_id: U256) -> Result<(), Vec<u8>> {
        self.erc721.burn(msg::sender(), token_id)?;
        Ok(())
    }
}