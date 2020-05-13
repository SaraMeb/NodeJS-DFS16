// document.getElementById('btnNewFlipbook').addEventListener('click', function(evt) {
//   $('#myModal').modal('show');
// })
// Create flipbook
if(document.getElementById('addflipbook')){
document.getElementById('addflipbook').addEventListener('submit', function(event) {
    event.preventDefault();
    var title = event.target.title.value;
    var description = event.target.description.value;
    var file = event.target.file.value;

    var datas = {
        'title': title,
        'description': description,
        'file': file,
    };
    fetch('/admin', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datas)
    }
    )
        .then(function (r) { return r.json() })
        .then(function (response) {
            if (response.status) {
                document.location.reload();
            } else {
                alert(response.message || 'Erreur');
            }
        })
});
}
