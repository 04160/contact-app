$(document).ready(() => {
    $('#send-mail').on('click', sendMail);
});

function sendMail() {
    let mailContent = {
        from: $('#input-from').val(),
        to: $('#input-to').val(),
        subject: $('#input-subject').val(),
        text: $('#input-text').val()
    };
    let isValidContent = true;
    if (isValidContent) {
        $.ajax({
            type: 'POST',
            data: mailContent,
            dataType: 'JSON',
            url: '/mail'
        }).done((res) => {

        });
    }
}

function clearEmailEntryForm () {
    $('#mail-entry-form input').val("");
}