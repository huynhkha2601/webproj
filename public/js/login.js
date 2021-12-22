//  async function sendForm() {
//
//     let url = $(location).attr('href');
//     console.log(url);
//     const rawResponse = await fetch("/accounts/register/profile/patch", {
//         method: "POST",
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         }
//         body: JSON.stringify({
//             id: id,
//             fullname: $('#fullname').val(),
//             gender: $('#gender').val(),
//             dob: $('#dob').val(),
//             telephone: $('#telephone').val(),
//             address: $('#address').val()
//         })
//     });
//     // let data = await rawResponse.json();
//     // const response = await fetch(url, {
//     //     method: "GET", // *GET, POST, PUT, DELETE, etc.
//     // });
// }
// $("#frmRegister").addEventListener("submit", sendForm);


async function loadImage() {
    const productid = $('#productid').val();
    console.log(productid);
    $.getJSON(`/admin/products/edit/api?productid=${productid}`, async function (data){
        console.log(data);
        $("#img").fileinput({

            initialPreview: `<img class="file-preview-image kv-preview-data" src=${data.title}>`,
            initialPreviewConfig: {
                url: data.title
            }
        });

        $("#anotherimg").fileinput({
            initialPreview: [
                `<img class="file-preview-image kv-preview-data" src=${data.another[0]}>`,
                `<img class="file-preview-image kv-preview-data" src=${data.another[1]}>`,
                `<img class="file-preview-image kv-preview-data" src=${data.another[2]}>`
            ],
            initialPreviewConfig: [
                {url: data.another[0]},
                {url: data.another[1]},
                {url: data.another[2]}
            ]
        });

    });

    // const data = await rawResponse.json();
    // console.log(data.title);
    //
    // $("#img").fileinput({
    //     initialPreview: '<img class="file-preview-image kv-preview-data" src="/public/images/80/title/main.jpg">',
    //     initialPreviewConfig: {
    //         url: "/public/images/80/title/main.jpg"
    //     }
    // });
    //
    // $("#anotherimg").fileinput({
    //     initialPreview: '<img class="file-preview-image kv-preview-data" src="/public/images/80/title/main.jpg">',
    //     initialPreviewConfig: {
    //         url: "/public/images/80/title/main.jpg"
    //     }
    // });

}

loadImage();
