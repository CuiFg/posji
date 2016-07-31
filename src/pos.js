'use strict';

/*let tags =[
    ITEM000000,
    ITEM000000,
    ITEM000000-2,
    ITEM000001,
    ITEM000002-3.5,
    ITEM000003-2
];

/*function print(subTotalItems,total,saveMoney)
 {
 let formattedTags = parseTag(tags);
 let mergedBarcode = mergeBarcodes(formattedTags);
 let items = loadAllItems();
 let cartItemsAmount =getCartItems(mergedBarcode, items);
 let PromotionsItems = loadPromotions();
 let cartItemsAmountType = getCartItemsAmountType(PromotionsItems,cartItemsAmount);
 //let cartItemsAmountType = getCartItemsAmountType(PromotionsItems,cartItemsAmount);
 let PromotedItems = getPromotedItems(cartItemsAmountType);
 }*/

function parseTag(tags)
{
    return tags.map(function(tag){
        let tagsPart = tag.split("-");
        return {barcode: tagsPart[0],amount: parseFloat(tagsPart[1]) || 1 };

    })
}

function mergeBarcodes(formattedTags)
{
    return formattedTags.reduce(function(cur,old){
        let existItem = cur.find(function(item){
            return  item.barcode === old.barcode;
        });

        if (existItem)
        {
            existItem.amount += old.amount;

        }
        else
        {
            cur.push(old);

        }

        return cur;
    },[])
}
//console.log(mergedBarcode);

function getCartItems(mergedBarcode, items)
{
    let cartItemsAmount=[];
    for(let i =0; i< mergedBarcode.length; i++)
    {
        for(let j = 0; j< items.length; j++)
        {
          if(mergedBarcode[i].barcode === items[j].barcode)
          {
              cartItemsAmount.push(Object.assign({},items[j],{amount: mergedBarcode[i].amount}));
          }
        }

    }
    return cartItemsAmount;
}
//console.log(cartItemsAmount);

function getCartItemsAmountType(PromotionsItems,cartItemsAmount)
{
    let cartItemsAmountType=[];
    for(let i=0; i< cartItemsAmount.length; i++)
    {
        for(let j= 0; j<PromotionsItems.length; j++)
        {
            for(let k =0; k < PromotionsItems[j].barcodes.length; k++)
            if(cartItemsAmount[i].barcode === PromotionsItems[j].barcodes[k])
            {
                cartItemsAmountType.push(Object.assign({},cartItemsAmount[i],{type:PromotionsItems[j].type}));

            }
        }

    }
    return  cartItemsAmountType;
}

function getPromotedItems(cartItemsAmountType)
{
    let PromotedItems =[];
    for(let i= 0; i< cartItemsAmountType.length; i++)
    {
        if(cartItemsAmountType[i].type ==="BUY_TWO_GIVE_ONE" )
        {
            let ReduceAmount= parseInt(cartItemsAmountType[i].amount / 3);
             let Amount = cartItemsAmountType[i].amount-ReduceAmount;
            let money = ReduceAmount * cartItemsAmountType[i].price;
            PromotedItems.push(Object.assign({},cartItemsAmountType[i],
                {promotedAmount:Amount, promotedPrice:money} ));
        }
    else
        {
            PromotedItems.push(Object.assign({},cartItemsAmountType[i],
                {promotedAmount:cartItemsAmountType[i].amount,promotedPrice:0 }));
        }
    }
    return  PromotedItems;
}

function getsubTotal(PromotedItems)
{
    let subTotalItems=[];
    for(let i = 0; i<PromotedItems.length; i++ )
    {
        let subTotalValue = PromotedItems[i].promotedAmount * PromotedItems[i].price;
        subTotalItems.push(Object.assign({},PromotedItems[i],{subTotal:subTotalValue}));
    }
    return  subTotalItems;
}

function getTotal(subTotalItems)
{
    let total = 0;
    for(let i =0; i <subTotalItems.length; i++ )
    {
         total += subTotalItems[i].subTotal;
    }
    return  total;
}

function getSaveMoney(subTotalItems)
{
    let saveMoney = 0;
    for(let i =0; i< subTotalItems.length; i++)
    {
        saveMoney += subTotalItems[i].promotedPrice;
    }
    return saveMoney;
}






















