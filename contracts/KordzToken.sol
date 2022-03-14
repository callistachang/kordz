// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract KordzToken is ERC721 {
    address public marketplace;
    uint256 public maxSupply;

    struct Item {
        uint256 id;
        address seller;
        string metadataUri;
    }

    mapping(uint256 => Item) public items;

    constructor() ERC721("KordzToken", "KORDZ") {}

    function mint(string memory uri_) public returns (uint256) {
        uint256 tokenId = maxSupply;
        _safeMint(msg.sender, tokenId);
        approve(marketplace, tokenId);
        items[maxSupply] = Item(tokenId, msg.sender, uri_);
        maxSupply++;
        return tokenId;
    }

    function tokenURI(uint256 tokenId_)
        public
        view
        override
        returns (string memory)
    {
        require(
            _exists(tokenId_),
            "ERC721URIStorage: URI query for nonexistent token"
        );
        return items[tokenId_].metadataUri;
    }

    function setMarketplace(address marketplace_) public {
        marketplace = marketplace_;
    }
}
