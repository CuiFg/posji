'use strict';
 describe("parseTag", function(){
     it("two parts from barcode ", function(){
         let Tags = ["ITEM000000-1.5"];
         let result = parseTag(Tags);
         let tagPart = [{barcode:"ITEM000000",amount:1.5}];
         expect(result).toEqual(tagPart);
     });

 })
describe("mergeBarcodes", function(){
    it("addBarcodeAmount", function(){
        let parsedTags = [
            {barcode:"ITEM000000",amount:1.5},
            {barcode:"ITEM000000",amount:1.5},

        ]
        let result = mergeBarcodes(parsedTags);
        let mergedBarcode = [{barcode:"ITEM000000",amount:3}];
        expect(result).toEqual(mergedBarcode);
    })

})

describe("getCartItems",function(){
    it("giveCartItemsAdd-amount",function(){
        let items=[
            {
                barcode: 'ITEM000000',
                name: '可口可乐',
                unit: '瓶',
                price: 3.00
            },
            {
                barcode: 'ITEM000001',
                name: '雪碧',
                unit: '瓶',
                price: 3.00
            }

        ];
        let mergedBarcode =[
            {
                barcode: 'ITEM000000',
                amount:2
            },
            {
                barcode: 'ITEM000001',
                amount:3
            }
        ];

        let result = getCartItems(mergedBarcode, items);
        let cartItems = [
            {
                barcode: 'ITEM000000',
                name: '可口可乐',
                unit: '瓶',
                price: 3.00,
                amount:2
            },
            {
                barcode: 'ITEM000001',
                name: '雪碧',
                unit: '瓶',
                price: 3.00,
                amount:3
            }
        ];
        expect(result).toEqual(cartItems);
    })

})
describe("getCartItemsAmountType",function(){
    it("addBarcodetype", function(){
        let PromotionsItems=loadPromotions();
        let cartItemsAmount= [
            {
                barcode: 'ITEM000000',
                name: '可口可乐',
                unit: '瓶',
                price: 3.00,
                amount:2
            },
            {
                barcode: 'ITEM000002',
                name: '雪碧',
                unit: '瓶',
                price: 3.00,
                amount:3
            }
        ];
        let result = getCartItemsAmountType(PromotionsItems,cartItemsAmount);
        let CartItemsAmountType = [
            {
                barcode: 'ITEM000000',
                name: '可口可乐',
                unit: '瓶',
                price: 3.00,
                amount:2,
                type:'BUY_TWO_GIVE_ONE'
            },
            {
                barcode: 'ITEM000002',
                name: '雪碧',
                unit: '瓶',
                price: 3.00,
                amount:3,
                type:'OTHER_PROMOTION'
            }

        ];
        expect(result).toEqual(CartItemsAmountType);
    })
})
describe("getPromotedItems",function(){
    it("getPromotedMoney-amount", function (){
        let CartItemsAmountType = [
            {
                barcode: 'ITEM000000',
                name: '可口可乐',
                unit: '瓶',
                price: 3.00,
                amount:3,
                type:'BUY_TWO_GIVE_ONE'
            },
            {
                barcode: 'ITEM000002',
                name: '雪碧',
                unit: '瓶',
                price: 3.00,
                amount:3,
                type:'OTHER_PROMOTION'
            }]
            let result = getPromotedItems(CartItemsAmountType);
            let PromotedItems=[
                {
                    barcode: 'ITEM000000',
                    name: '可口可乐',
                    unit: '瓶',
                    price: 3.00,
                    amount:3,
                    type:'BUY_TWO_GIVE_ONE',
                    promotedAmount:2,
                    promotedPrice:3
                },
                {
                    barcode: 'ITEM000002',
                    name: '雪碧',
                    unit: '瓶',
                    price: 3.00,
                    amount:3,
                    type:'OTHER_PROMOTION',
                    promotedAmount:3,
                    promotedPrice:0
                }

            ];
            expect(result).toEqual(PromotedItems);
    })

})

describe("getsubTotal",function(){

    it("calculateSubTotal",function(){
        let PromotedItems=[
            {
                barcode: 'ITEM000000',
                name: '可口可乐',
                unit: '瓶',
                price: 3.00,
                amount:3,
                type:'BUY_TWO_GIVE_ONE',
                promotedAmount:2,
                promotedPrice:3
            },
            {
                barcode: 'ITEM000002',
                name: '雪碧',
                unit: '瓶',
                price: 3.00,
                amount:3,
                type:'OTHER_PROMOTION',
                promotedAmount:3,
                promotedPrice:0
            }];
            let result = getsubTotal(PromotedItems);
            let  subTotalItems = [
                {
                    barcode: 'ITEM000000',
                    name: '可口可乐',
                    unit: '瓶',
                    price: 3.00,
                    amount:3,
                    type:'BUY_TWO_GIVE_ONE',
                    promotedAmount:2,
                    promotedPrice:3,
                    subTotal:6
                },
                {
                    barcode: 'ITEM000002',
                    name: '雪碧',
                    unit: '瓶',
                    price: 3.00,
                    amount:3,
                    type:'OTHER_PROMOTION',
                    promotedAmount:3,
                    promotedPrice:0,
                    subTotal:9
                }
            ];
        expect(result).toEqual(subTotalItems);
    })
})
describe("getTotal",function(){
    it("calculateTotal", function(){
        let  subTotalItems = [
            {
                barcode: 'ITEM000000',
                name: '可口可乐',
                unit: '瓶',
                price: 3.00,
                amount:3,
                type:'BUY_TWO_GIVE_ONE',
                promotedAmount:2,
                promotedPrice:3,
                subTotal:6
            },
            {
                barcode: 'ITEM000002',
                name: '雪碧',
                unit: '瓶',
                price: 3.00,
                amount:3,
                type:'OTHER_PROMOTION',
                promotedAmount:3,
                promotedPrice:0,
                subTotal:9
            }
        ];
        let result = getTotal(subTotalItems);
        let total= 15;
        expect(result).toEqual(total);
    })

})

describe("getSaveMoney",function(){
    it("calculateSaveMoney", function(){
        let  subTotalItems = [
            {
                barcode: 'ITEM000000',
                name: '可口可乐',
                unit: '瓶',
                price: 3.00,
                amount:3,
                type:'BUY_TWO_GIVE_ONE',
                promotedAmount:2,
                promotedPrice:3,
                subTotal:6
            },
            {
                barcode: 'ITEM000002',
                name: '雪碧',
                unit: '瓶',
                price: 3.00,
                amount:3,
                type:'OTHER_PROMOTION',
                promotedAmount:3,
                promotedPrice:0,
                subTotal:9
            }
        ];
        let result = getSaveMoney(subTotalItems);
        let saveMoney= 3;
        expect(result).toEqual(saveMoney);
    })

})
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




