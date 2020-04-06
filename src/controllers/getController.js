const fetch = require('node-fetch');
const requestOptions = {
    method: "GET",
    redirect: "follow"
};
function overview(req, res) {
    console.log('test')
    fetch(`https://api.spacexdata.com/v3/launches`)
        .then(res => res.json())
        .then(body => {
            res.render('./pages/overview', {
                title: 'Launches',
                launches: body
            });
        })
}


module.exports = {
    overview,
}