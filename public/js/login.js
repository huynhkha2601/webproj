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