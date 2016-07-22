'use strict';
 describe("parseTag", function(){
     it("two parts from barcode ", function(){

         let result = parseTag(["ITEM000000-1.5"]);
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



