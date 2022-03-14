// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./KordzToken.sol";

contract KordzMarketplace {
    KordzToken private token;

    struct ItemForSale {
        uint256 id;
        uint256 tokenId;
        address payable seller;
        uint256 price;
        bool isSold;
    }

    ItemForSale[] public itemsForSale;
    mapping(uint256 => bool) public activeItems;

    event ItemAddedForSale(uint256 id, uint256 tokenId, uint256 price);
    event ItemSold(uint256 id, address buyer, uint256 price);

    constructor(KordzToken _token) {
        token = _token;
    }

    function putItemForSale(uint256 tokenId, uint256 price)
        external
        returns (uint256)
    {
        require(token.ownerOf(tokenId) == msg.sender, "NOT_OWNER");
        require(!activeItems[tokenId], "ITEM_ALREADY_FOR_SALE");

        uint256 newItemId = itemsForSale.length;
        itemsForSale.push(
            ItemForSale({
                id: newItemId,
                tokenId: tokenId,
                seller: payable(msg.sender),
                price: price,
                isSold: false
            })
        );
        activeItems[tokenId] = true;

        emit ItemAddedForSale(newItemId, tokenId, price);
        return newItemId;
    }

    function buyItem(uint256 id) external payable {
        require(!itemsForSale[id].isSold, "ITEM_ALREADY_SOLD");
        require(
            id < itemsForSale.length && itemsForSale[id].id == id,
            "ITEM_NOT_FOUND"
        );
        require(msg.value >= itemsForSale[id].price, "INSUFFICIENT_MATIC");
        require(msg.sender != itemsForSale[id].seller, "CANNOT_BUY_OWN_ITEM");

        itemsForSale[id].isSold = true;
        activeItems[itemsForSale[id].tokenId] = false;
        token.safeTransferFrom(
            itemsForSale[id].seller,
            msg.sender,
            itemsForSale[id].tokenId
        );
        itemsForSale[id].seller.transfer(msg.value);

        emit ItemSold(id, msg.sender, itemsForSale[id].price);
    }

    function totalItemsForSale() external view returns (uint256) {
        return itemsForSale.length;
    }
}
