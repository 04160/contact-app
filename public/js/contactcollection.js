let contactListData = [];

$(document).ready(() => {
    console.log('contact collection ready');
    populateTable(true);
    $('#contactList tbody').on('click', '.profile-listed', showFullContactInfo);
    $('#contactList tbody').on('click', '.linkdeletecontact', deleteContact);

});


function populateTable(resetInfo = false) {
    let tableContent = '';
    $.getJSON( '/contactcollection/contactlist', function (data) {
        contactListData = data;
        $.each(data, function () {
            tableContent += '<tr class="profile-listed" rel="' + this._id + '">';
            tableContent += '<td class="listed-forename">' + this.forename + '</td>';
            tableContent += '<td class="listed-surname">' + this.surname + '</td>';
            tableContent += '<td class="listed-email">' + JSON.parse(this.email) + '</td>';
            tableContent += '<td class="listed-about">' + this.about + '</td>';
            tableContent += '<td><a href="#" class="linkdeletecontact" rel="' + this._id + '"><i class="fa fa-trash-o fa-fw"></i></a><a href="#" class="linkeditcontact" rel="' + this._id + '"><i class="fa fa-pencil fa-fw"></i></a><a href="#" class="mailcontact" rel="' + this._id + '"><i class="fa fa-envelope-o fa-fw"></i></a></td>';
            tableContent += '</tr>';
        });

        $('#contactList tbody').html(tableContent);
    }).done(() => {
        console.log(contactListData);
        if (contactListData.length !== 0) {
            if (resetInfo) {
                fillContactInfo(0);
                $('#contactList tbody tr').on('click', function () {
                    let focusedElement = $('.focused');
                    if (focusedElement.length > 0 ) {
                        focusedElement.removeClass('focused');
                    }
                    $(this).addClass('focused')
                })
            }
        } else {
            window.location.replace('/newcontact')
        }
    });
};

function showFullContactInfo(event) {
    event.preventDefault();
    let arrayPosition = contactListData.map((arrayItem) => { return arrayItem._id; }).indexOf($(this).attr('rel'));

    fillContactInfo(arrayPosition);
};

function fillContactInfo(arrayPosition) {
    let contactObject = contactListData[arrayPosition];

    $('#profileForename .content').text(contactObject.forename);
    $('#profileSurname .content').text(contactObject.surname);
    $('#profileEmail .content').text(JSON.parse(contactObject.email));
    $('#profilePhone .content').text(JSON.parse(contactObject.phone));
    $('#profileOccupation .content').text(contactObject.occupation);
    $('#profileLocation .content').text(contactObject.location);
    $('#profileAbout .content').text(contactObject.about);
}

function deleteContact(event) {
    event.preventDefault();
    // Pop up a confirmation dialog
    let confirmation = confirm('Are you sure you want to delete this contact?');
    if (confirmation === true) {
        // If they did, do our delete
        // console.log($(this));
        let rel = $(this).attr('rel');
        $.ajax({
            type: 'DELETE',
            url: '/contactcollection/deletecontact/' + rel
        }).done((response) => {
            // Check for a successful (blank) response
            if (response.msg === '') {
            } else {
                alert('Error: ' + response.msg);
            }
            // Update the table
            let refreshInfo = false;
            console.log(rel);
            if (
                $('#profileForename .content').text() === $('[rel="' + rel + '"] .listed-forename').text()
                && $('#profileSurname .content').text() === $('[rel="' + rel + '"] .listed-surname').text()
            ) {
                refreshInfo = true
            }
            populateTable(refreshInfo);
        });
    }
    else {
        // If they said no to the confirm, do nothing
        return false;
    }
};