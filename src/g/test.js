

fetch('http://demo.edument.se/api/products')
    .then(response => response.json())
    .then(products => {
        var randomQty = products.map(function(el) {
            var o = Object.assign({}, el);
            o.Qty = Math.floor((Math.random() * 10) + 1);
            return o;
        })
        return randomQty;
    });


    //
    // .then(products => {
    //     let randomQty =
    //         products.map(function (el) {
    //             var o = Object.assign({}, el);
    //             o.Qty = Math.floor((Math.random() * 10) + 1);
    //             return o;
    //         })
    //     console.log(randomQty);
    // })