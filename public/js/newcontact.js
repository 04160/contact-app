let formData;

$(document).ready(() => {
    console.log('new contact ready');
    $('#btnAddContact').on('click', addContact);
    $('input').on('focusout', function () {
        checkFieldCorrectness($(this).parent());
        hideLabel($(this));
    }).on('focusin', function () {
        showLabel($(this));
    });
});

function showLabel(element) {
    $(element.siblings()[0]).css({'opacity' : 1});
}

function hideLabel(element) {
    if (element.val() !== '') {
        $(element.siblings()[0]).css({'opacity' : 0});
    }
}

function checkFieldCorrectness(element) {
    let elementId = element.attr('id'),
        isEntryValid;

    switch (elementId) {
        case 'profile-email':
            isEntryValid = /^[A-Za-z._0-9]+@[A-Za-z]+(\.[A-Za-z]{2,4})+$/i.test(element.find('input').val());
            break;
        case 'profile-phone':
            isEntryValid = /^\+?[0-9]{7,14}$/.test(element.find('input').val());
            break;
        case 'profile-bday':
            isEntryValid = /^([0-9]{2}\.){2}[0-9]{4}$/.test(element.find('input').val());
            break;
        case 'profile-about':
        case 'profile-location':
        case 'profile-occupation':
            isEntryValid = element.find('input').val().length < 50;
            break;
        default:
            let value = element.find('input').val();
            isEntryValid = value.length > 3 && value.length < 36;
            break;
    }

    if(!isEntryValid) {
        element.addClass('invalidForm');
    } else if (isEntryValid && element.hasClass('invalidForm')) {
        element.removeClass('invalidForm');
    }
}

function addContact(event) {
    let button = $(this);
    event.preventDefault();
    $('#addContact .field').each(function (index, val) {
        checkFieldCorrectness($(this));
    });

    if($('.invalidForm').length === 0 && !button.data('loading')) {
        let val = button.val(),
            time = moment().format('DD.MM.YYYY'),
            newContact;

        button.data('loading', true)
            .addClass('btn-loading')
            .val('');

        newContact = {
            'forename' : $('#input-forename').val(),
            'surname': $('#input-surname').val(),
            'email': JSON.stringify([$('#input-email').val()]),
            'phone': JSON.stringify([$('#input-phone').val()]),
            'bday': $('#input-bday').val(),
            'location': $('#input-location').val(),
            'occupation': $('#input-occupation').val(),
            'about': $('#input-about').val(),
            'created': time,
            'updated' : time
        };

        $.ajax({
            type: 'POST',
            data: newContact,
            url: '/newcontact/addcontact',
            dataType: 'JSON',
            success: function (msg) {
                console.log('success');
                button.data('loading', false)
                    .removeClass('btn-loading');
                    // .val(val);
            }
        }).done((res) => {
            console.log(formData);
            if (typeof formData === 'object') {
                //add process bar for file upload
            } else if (res.msg === '') {
                window.location.href = '/contactcollection';
            } else {
                $('.error-message').css({'opacity': 1});
            }
        });
    } else {
        $('#addContact .errorMessage').css("display", "block");
        return false;
    }
}