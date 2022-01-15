$('#frmAddProduct').on('submit', function(e){
    e.preventDefault();
    let numAnoImg = $("#anotherimg")[0].files.length;
    let numTitleImg = $("#img")[0].files.length;
    console.log(numAnoImg);
    console.log(numTitleImg);
    if (numAnoImg === 3 && numTitleImg === 1) {
        $("#frmAddProduct").off('submit').submit();
    }else{
        alert("Your product must have 1 title image and 3 other related photos!");
        return;
    }
});

// async function loadImage() {
//     const productid = $('#productid').val();
//     console.log(productid);
//     $.getJSON(`/admin/products/edit/api?productid=${productid}`, async function (data){
//         console.log(data);
//         $("#img").fileinput({
//
//             initialPreview: `<img class="file-preview-image kv-preview-data" src=${data.title}>`,
//             initialPreviewConfig: {
//                 url: data.title
//             }
//         });
//
//         $("#anotherimg").fileinput({
//             initialPreview: [
//                 `<img class="file-preview-image kv-preview-data" src=${data.another[0]}>`,
//                 `<img class="file-preview-image kv-preview-data" src=${data.another[1]}>`,
//                 `<img class="file-preview-image kv-preview-data" src=${data.another[2]}>`
//             ],
//             initialPreviewConfig: [
//                 {url: data.another[0]},
//                 {url: data.another[1]},
//                 {url: data.another[2]}
//             ]
//         });
//
//     });
//
//     // const data = await rawResponse.json();
//     // console.log(data.title);
//     //
//     // $("#img").fileinput({
//     //     initialPreview: '<img class="file-preview-image kv-preview-data" src="/public/images/80/title/main.jpg">',
//     //     initialPreviewConfig: {
//     //         url: "/public/images/80/title/main.jpg"
//     //     }
//     // });
//     //
//     // $("#anotherimg").fileinput({
//     //     initialPreview: '<img class="file-preview-image kv-preview-data" src="/public/images/80/title/main.jpg">',
//     //     initialPreviewConfig: {
//     //         url: "/public/images/80/title/main.jpg"
//     //     }
//     // });
//
// }

// loadImage();
