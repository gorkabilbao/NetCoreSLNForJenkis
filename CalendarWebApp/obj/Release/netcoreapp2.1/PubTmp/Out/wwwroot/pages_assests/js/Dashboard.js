
function editEvent(event) {
    $('#event-modal input[name="event-index"]').val(event ? event.id : '');
    $('#event-modal input[name="event-name"]').val(event ? event.name : '');
    $('#event-modal input[name="event-location"]').val(event ? event.location : '');
    $('#event-modal input[name="event-start-date"]').datepicker('update', event ? event.startDate : '');
    $('#event-modal input[name="event-end-date"]').datepicker('update', event ? event.endDate : '');
    $('#event-modal').modal();
}

function deleteEvent(event) {
    var dataSource = $('#calendar').data('calendar').getDataSource();

    for (var i in dataSource) {
        if (dataSource[i].id == event.id) {
            dataSource.splice(i, 1);
            break;
        }
    }

    $('#calendar').data('calendar').setDataSource(dataSource);
}

function saveEvent() {
    var event = {
        id: $('#event-modal input[name="event-index"]').val(),
        name: $('#event-modal input[name="event-name"]').val(),
        location: $('#event-modal input[name="event-location"]').val(),
        startDate: $('#event-modal input[name="event-start-date"]').datepicker('getDate'),
        endDate: $('#event-modal input[name="event-end-date"]').datepicker('getDate')
    }

    var dataSource = $('#calendar').data('calendar').getDataSource();

    if (event.id) {
        for (var i in dataSource) {
            if (dataSource[i].id == event.id) {
                dataSource[i].name = event.name;
                dataSource[i].location = event.location;
                dataSource[i].startDate = event.startDate;
                dataSource[i].endDate = event.endDate;
            }
        }
    }
    else {
        var newId = 0;
        for (var i in dataSource) {
            if (dataSource[i].id > newId) {
                newId = dataSource[i].id;
            }
        }

        newId++;
        event.id = newId;

        dataSource.push(event);
    }

    $('#calendar').data('calendar').setDataSource(dataSource);
    $('#event-modal').modal('hide');
}

$(function () {
    var currentYear = new Date().getFullYear();

	var currentYear = new Date().getFullYear();

	$.ajax({
		url: "/Dashboard/Vacances",
		type: 'GET',
		contentType: 'application/json',
		dataType: 'json',
		success: function (response) {
			var data = [];
			for (var i = 0; i < response.length; i++) {
				data.push({
					startDate: new Date(response[i].startdate),
					endDate: new Date(response[i].enddate),
					color: response[i].color
				});
			}
			$('#calendar').calendar({
				displayWeekNumber: true,
				enableContextMenu: true,
				enableRangeSelection: true,
				contextMenuItems: [
					{
						text: 'Update',
						click: editEvent
					},
					{
						text: 'Delete',
						click: deleteEvent
					}
				],
				selectRange: function (e) {
					editEvent({ startDate: e.startDate, endDate: e.endDate });
				},
				mouseOnDay: function (e) {
					if (e.events.length > 0) {
						var content = '';

						for (var i in e.events) {
							content += '<div class="event-tooltip-content">'
								+ '<div class="event-name" style="color:' + e.events[i].color + '">' + e.events[i].name + '</div>'
								+ '<div class="event-location">' + e.events[i].location + '</div>'
								+ '</div>';
						}

						$(e.element).popover({
							trigger: 'manual',
							container: 'body',
							html: true,
							content: content
						});

						$(e.element).popover('show');
					}
				},
				mouseOutDay: function (e) {
					if (e.events.length > 0) {
						$(e.element).popover('hide');
					}
				},
				dayContextMenu: function (e) {
					$(e.element).popover('hide');
				},
				dataSource: data
			});
		},
		error: function (error) {
			alert(error);
		}
	});

    $('#save-event').click(function () {
        saveEvent();
    });
});

var trace1 = {
    x: ['Monday', 'Tuesday', 'Wednesday', 'Thrusday', 'Friday','Next Mon','Next Tues','Next Wednes'],
    y: [20, 14, 23,12,35,25,12,15],
    name: 'New PA/PR',
    type: 'bar'
};

var trace2 = {
    x: ['Monday', 'Tuesday', 'Wednesday', 'Thrusday', 'Friday', 'Next Mon', 'Next Tues', 'Next Wednes'],
    y: [12, 18, 29,20,33,20,28,11],
    name: 'In Progress PA/PR',
    //marker: {
    //    color: 'rgba(255, 0, 0, 0.7)',
    //    //line: {
    //    //    color: 'rgba(219, 64, 82, 1.0)',
    //    //    width: 2
    //    //}
    //},
    type: 'bar'
};



var data = [trace1, trace2];

var layout = {
    showlegend: true,
    barmode: 'stack',
    legend: {
        "orientation": "h",
        xanchor: "center",
        y: -0.2,
        x: 0.5
    },
    height: 350,
    //title: 'PA&PR per day',
    margin: {
        l: 15,
        r: 10,
        b: 5,
        t: 10,
        pad: 0
    }
};
var config = {
    responsive: true,
    displayModeBar: false
}
Plotly.newPlot('barchartExample', data, layout, config);

var trace1 = {
    x: ['Monday', 'Tuesday', 'Wednesday', 'Thrusday', 'Friday', 'Next Mon', 'Next Tues', 'Next Wednes'],
    y: [3, 5, 1, 5, 4,2,1,3],
    name: 'New Forming',
    type: 'bar'
};

var trace2 = {
    x: ['Monday', 'Tuesday', 'Wednesday', 'Thrusday', 'Friday', 'Next Mon', 'Next Tues', 'Next Wednes'],
    y: [2, 1, 2, 3, 1,2,2,1],
    name: 'In Progress Forming',
    //marker: {
    //    color: 'rgba(255, 0, 0, 0.7)',
    //    //line: {
    //    //    color: 'rgba(219, 64, 82, 1.0)',
    //    //    width: 2
    //    //}
    //},
    type: 'bar'
};

var data = [trace1, trace2];

var layout = {
    showlegend: true,
    barmode: 'stack' ,
    legend: {
        "orientation": "h",
        xanchor: "center",
        y: -0.2,
        x: 0.5
    },
    height: 350,
    //title: 'PA&PR per day',
    margin: {
        l: 15,
        r: 10,
        b: 5,
        t: 10,
        pad: 0
    }
};
var config = {
    responsive: true,
    displayModeBar: false
}
Plotly.newPlot('barchartExample2', data, layout, config);




var trace1 = {
    x: ['Monday', 'Tuesday', 'Wednesday', 'Thrusday', 'Friday', 'Next Mon', 'Next Tues', 'Next Wednes'],
    y: [8, -5, 3, 12, -10,7,-3,4],
    name: 'TC Lulea PA&PR',
    mode: 'markers',
    marker: {
        //color: ['hsl(0,100,40)', 'hsl(33,100,40)', 'hsl(66,100,40)', 'hsl(99,100,40)'],
        //size: [12, 22, 32, 42],
        //opacity: [0.6, 0.7, 0.8, 0.9]
        symbol: 'circle',
        size: 15
    },
    type: 'scatter'
};

var trace2 = {
    x: ['Monday', 'Tuesday', 'Wednesday', 'Thrusday', 'Friday', 'Next Mon', 'Next Tues', 'Next Wednes'],
    y: [-13, 4, 6, -11, 2,-4,-5,8],
    name: 'TC Lulea Forming',
    mode: 'markers',
    marker: {
        //color: 'rgb(31, 119, 180)',
        //size: 18,
        //symbol: ['circle', 'square', 'diamond', 'cross']
        symbol: 'circle',
        size: 15
    },
    type: 'scatter'
};

var trace3 = {
    x: ['Monday', 'Tuesday', 'Wednesday', 'Thrusday', 'Friday', 'Next Mon', 'Next Tues', 'Next Wednes'],
    y: [-3, -5, 12, 9, 13,-6,-9,5],
    name: 'TC Ludwigsfelde',
    mode: 'markers',
    marker: {
        //size: 18,
        //line: {
        //    color: ['rgb(120,120,120)', 'rgb(120,120,120)', 'red', 'rgb(120,120,120)'],
        //    width: [2, 2, 6, 2]
        //}
        symbol: 'circle',
        size: 15
    },
    type: 'scatter'
};

var data = [trace1, trace2, trace3];

var layout = {
    showlegend: true,
    legend: {
        "orientation": "h",
        xanchor: "center",
        y: -0.2,
        x: 0.5
    },
    height: 350,
    //title: 'PA&PR per day',
    margin: {
        l: 15,
        r: 10,
        b: 5,
        t: 10,
        pad: 0
    }
};
var config = {
    responsive: true,
    displayModeBar: false
}

Plotly.newPlot('barchartExample1', data, layout, config);




//show image
$('#arkaitzSustatxa').click(function () {
    var imageToAppend = '<div class="media-left"><img src="assets/images/Arkaitz.jpg" id="imageArkaitz" class="img-circle img-md" alt="" style="border: 2px solid blue;"></div>';
    $("#userphoto").append(imageToAppend);
});

//show holidays label
$(document).on({
    mouseenter: function (e) {
        $("#remainingHolidays").append("Remaining holidays: 14 days");
    },
    mouseleave: function (e) {
        $("#remainingHolidays").empty();
        //$('#modal_arkaitz').modal('toggle');
    }
}, "#imageArkaitz"); //pass the element as an argument to .on



//show image
$('#jorgeBunuel').click(function () {
    var imageToAppend = '<div class="media-left"><img src="assets/images/Jorge.jpg" id="imageJorge" class="img-circle img-md" alt="" style="border: 2px solid blue;"></div>';
    $("#userphoto").append(imageToAppend);
});

//show holidays label
$(document).on({
    mouseenter: function (e) {
        $("#remainingHolidays").append("Remaining holidays: 2 days");
    },
    mouseleave: function (e) {
        $("#remainingHolidays").empty();
        //$('#modal_arkaitz').modal('toggle');
    }
}, "#imageJorge"); //pass the element as an argument to .on

//show image
$('#dennisBroms').click(function () {
    var imageToAppend = '<div class="media-left"><img src="assets/images/Dennis.jpg" id="imageDennis" class="img-circle img-md" alt="" style="border: 2px solid red;"></div>';
    $("#userphoto").append(imageToAppend);
});

//show holidays label
$(document).on({
    mouseenter: function (e) {
        $("#remainingHolidays").append("Remaining holidays: 8 days");
    },
    mouseleave: function (e) {
        $("#remainingHolidays").empty();
        //$('#modal_arkaitz').modal('toggle');
    }
}, "#imageDennis"); //pass the element as an argument to .on

//show task list
$('#showHideTaskManagerTable').change(function () {
    $("#taskManagerTable").toggleClass("hidden");
});


//c3 chart
var combined_chart = c3.generate({
	bindto: "#c3-combined-chart",
	size: { height: 400 },
	color: {
		pattern: ['#2ec7c9', '#b6a2de', '#2ec7c9', '#b6a2de']
	},
	data: {
		columns: [
			['Product Available', 3, 4, 5, 5,3],
			['Formings Available', 1, 2, 1, 3,2],
			['Total Products', 5, 5, 5, 5,5],
			['Total Formings', 3, 3, 3, 3, 3],
			['PA&PR Tasks', 8, 4, 6, 2, 3],
			['Formings Tasks', 4, 6, 2, 1, 1],
			//['data6', 4, 5, 2, 4, 5],
		],
		type: 'bar',
		types: {
			'Total Products': 'spline',
			'Total Formings': 'line',
			'PA&PR Tasks': 'spline',
			'Formings Tasks': 'spline',
			//data6: 'area',
		},
		//hide: ['PA Task', 'FS Task']
		//groups: [
		//	['Monday', 'data2', 'data5']
		//],
	},
	zoom: {
		enabled: true
	},
	axis: {
		x: {
			type: 'category',
			categories: ['Mon', 'Tues', 'Wed', 'Thur', 'Fri']
		}
	}
});


var chartStep = c3.generate({
	bindto: "#c3-combined-chart-step",
	data: {
		columns: [
			['Needed Hours', 300, 350, 300, 0, 0],
			['Available Hours', 130, 100, 140, 200, 150]
		],
		types: {
			'Needed Hours': 'step',
			'Available Hours': 'area-step'
		}
	}
});

var chartAll = c3.generate({
	bindto: "#c3-combined-chart-donut-all",
	data: {
		columns: [
			["PA&PR",14],
			["FS", 18],
			["Others", 4],
		],
		type: 'donut',
	},
	donut: {
		title: "Week 6 TC Bilbao"
	}
});
var chartMonday = c3.generate({
	bindto: "#c3-combined-chart-donut-monday",
	data: {
		columns: [
			["PA&PR", 14],
			["FS", 18],
			["Others", 4],
		],
		type: 'donut',
	},
	donut: {
		title: "Monday TC Bilbao"
	}
});

var chartTuesday = c3.generate({
	bindto: "#c3-combined-chart-donut-tuesday",
	data: {
		columns: [
			["PA&PR", 14],
			["FS", 18],
			["Others", 4],
		],
		type: 'donut',
	},
	donut: {
		title: "Tuesday TC Bilbao"
	}
});

var chartWednesday = c3.generate({
	bindto: "#c3-combined-chart-donut-wednesday",
	data: {
		columns: [
			["PA&PR", 14],
			["FS", 18],
			["Others", 4],
		],
		type: 'donut',
	},
	donut: {
		title: "Wednesday TC Bilbao"
	}
});

var chartThursday = c3.generate({
	bindto: "#c3-combined-chart-donut-thursday",
	data: {
		columns: [
			["PA&PR", 14],
			["FS", 18],
			["Others", 4],
		],
		type: 'donut',
	},
	donut: {
		title: "Thursday TC Bilbao"
	}
});

var chartFriday = c3.generate({
	bindto: "#c3-combined-chart-donut-friday",
	data: {
		columns: [
			["PA&PR", 14],
			["FS", 18],
			["Others", 4],
		],
		type: 'donut',
	},
	donut: {
		title: "Friday TC Bilbao"
	}
});

var chartGaugeMondayPAPR = c3.generate({
	bindto: "#c3-combined-chart-gauge-monday",
	data: {
		columns: [
			['data', 91.4]
		],
		type: 'gauge',
	},
	gauge: {
		//        label: {
		//            format: function(value, ratio) {
		//                return value;
		//            },
		//            show: false // to turn off the min/max labels.
		//        },
		//    min: 0, // 0 is default, //can handle negative min e.g. vacuum / voltage / current flow / rate of change
		//    max: 100, // 100 is default
		//    units: ' %',
		//    width: 39 // for adjusting arc thickness
	},
	color: {
		pattern: ['#FF0000', '#F97600', '#F6C600', '#60B044'], // the three color levels for the percentage values.
		threshold: {
			//            unit: 'value', // percentage is default
			//            max: 200, // 100 is default
			values: [30, 60, 90, 100]
		}
	},
	size: {
		height: 180
	}
});

var DatatableAdvanced = function () {


	//
	// Setup module components
	//

	// Basic Datatable examples
	var _componentDatatableAdvanced = function () {
		if (!$().DataTable) {
			console.warn('Warning - datatables.min.js is not loaded.');
			return;
		}

		// Setting datatable defaults
		$.extend($.fn.dataTable.defaults, {
			autoWidth: false,
			columnDefs: [{
				orderable: false,
				width: 100,
				targets: [5]
			}],
			dom: '<"datatable-header"fl><"datatable-scroll"t><"datatable-footer"ip>',
			language: {
				search: '<span>Filter:</span> _INPUT_',
				searchPlaceholder: 'Type to filter...',
				lengthMenu: '<span>Show:</span> _MENU_',
				paginate: { 'first': 'First', 'last': 'Last', 'next': $('html').attr('dir') == 'rtl' ? '&larr;' : '&rarr;', 'previous': $('html').attr('dir') == 'rtl' ? '&rarr;' : '&larr;' }
			}
		});

		// Datatable 'length' options
		$('.datatable-show-all').DataTable({
			lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "All"]]
		});

		// DOM positioning
		$('.datatable-dom-position').DataTable({
			dom: '<"datatable-header length-left"lp><"datatable-scroll"t><"datatable-footer info-right"fi>',
		});

		// Highlighting rows and columns on mouseover
		var lastIdx = null;
		var table = $('.datatable-highlight').DataTable();

		$('.datatable-highlight tbody').on('mouseover', 'td', function () {
			var colIdx = table.cell(this).index().column;

			if (colIdx !== lastIdx) {
				$(table.cells().nodes()).removeClass('active');
				$(table.column(colIdx).nodes()).addClass('active');
			}
		}).on('mouseleave', function () {
			$(table.cells().nodes()).removeClass('active');
		});

		// Columns rendering
		$('.datatable-columns').dataTable({
			columnDefs: [
				{
					// The `data` parameter refers to the data for the cell (defined by the
					// `data` option, which defaults to the column being worked with, in
					// this case `data: 0`.
					render: function (data, type, row) {
						return data + ' (' + row[3] + ')';
					},
					targets: 0
				},
				{ visible: false, targets: [3] }
			]
		});
	};

	// Select2 for length menu styling
	var _componentSelect2 = function () {
		if (!$().select2) {
			console.warn('Warning - select2.min.js is not loaded.');
			return;
		}

		// Initialize
		$('.dataTables_length select').select2({
			minimumResultsForSearch: Infinity,
			dropdownAutoWidth: true,
			width: 'auto'
		});
	};


	//
	// Return objects assigned to module
	//

	return {
		init: function () {
			_componentDatatableAdvanced();
			_componentSelect2();
		}
	}
}();


// Initialize module
// ------------------------------

document.addEventListener('DOMContentLoaded', function () {
	DatatableAdvanced.init();
});


