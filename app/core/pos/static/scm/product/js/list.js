function getData() {
    var parameters = {
        'action': 'search',
    };

    $('#data').DataTable({
        responsive: true,
        autoWidth: false,
        destroy: true,
        deferRender: true,
        ajax: {
            url: pathname,
            type: 'POST',
            headers: {
                'X-CSRFToken': csrftoken
            },
            data: parameters,
            dataSrc: ""
        },
        columns: [
            {data: "codebar"},
            {data: "category.name"},
            {data: "name"},
            {data: "desc"},
            {data: "stock"},
            {data: "price"},
            {data: "pvp"},
            {data: "price_promotion"},
            {data: "date_into"},
            {data: "image"},
            {data: "id"},
        ],
        columnDefs: [
            // {
            //     targets: [3],
            //     class: 'text-center',
            //     render: function (data, type, row) {
            //         if (row.category.inventoried) {
            //             return 'Si';
            //         }
            //         return 'No';
            //     }
            // },
            // date_into
            {
                targets: [8],
                class: 'text-center',
                render: function (data, type, row) {
                    return `${row.date_into}`;
                }
            },
            // image
            {
                targets: [9],
                class: 'text-center',
                render: function (data, type, row) {
                    
                    return '<img src="' + row.image + '" class="img-fluid d-block mx-auto" style="width: 20px; height: 20px;">';
                }
            },
            // stock
            {
                targets: [4],
                class: 'text-center',
                render: function (data, type, row) {
                    
                    if (row.category.inventoried) {
                        if (row.stock > 0) {
                            return '<span class="badge badge-success">' + row.stock + '</span>';
                        }
                        return '<span class="badge badge-danger">' + row.stock + '</span>';
                    }
                    return '<span class="badge badge-secondary">Sin stock</span>';
                }
            },
            {
                // pvp, price price_promotion
                targets: [7, 8, 9],
                class: 'text-center',
                render: function (data, type, row) {
                    
                    return 'S/.' + parseFloat(data).toFixed(2);
                }
            },
            // image
            {
                targets: [9],
                class: 'text-center',
                render: function (data, type, row) {
                    return '<img src="' + row.image + '" class="img-fluid d-block mx-auto" style="width: 20px; height: 20px;">';
                }
            },
            // id
            {
                targets: [10],
                class: 'text-center',
                render: function (data, type, row) {
                    var buttons = '';
                    buttons += '<a href="/pos/scm/product/update/' + row.id + '/" class="btn btn-warning btn-xs btn-flat"><i class="fas fa-edit"></i></a> ';
                    buttons += '<a href="/pos/scm/product/delete/' + row.id + '/" class="btn btn-danger btn-xs btn-flat"><i class="fas fa-trash"></i></a> ';
                    return buttons;
                }
            },
        ],
        rowCallback: function (row, data, index) {

        },
        initComplete: function (settings, json) {

        }
    });
}

$(function () {
    getData();
})