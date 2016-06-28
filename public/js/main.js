$(document).ready(function() {

    $('#createSchedule').popover({
        placement : 'bottom',
        html : true,
        title : 'Create Schedule <a href="#" class="close" data-dismiss="alert">×</a>',
        content : '<div class="media form-group">'+
        '<input type="text" placeholder="Name" class="form-control">' +
        '<input type="text" placeholder="Description" class="form-control">' +
        '<button type="submit" class="btn btn-primary">Go To Login »</button>' +
        '</div>'
    });

    $('#createTeam').popover({
        placement : 'bottom',
        html : true,
        title : 'Create Team <a href="#" class="close" data-dismiss="alert">×</a>',
        content : '<div class="media">'+
        '<input type="text" placeholder="Name" class="form-control">' +
        '<input type="text" placeholder="Description" class="form-control">' +

        '</div>'
    });

    $(document).on("click", ".popover .close" , function(e){
        $(this).parents(".popover").popover('hide');
    });

    //draggable to calendar
    $('#external-events .fc-event').each(function() {
      $(this).data('event', {
        title: $.trim($(this).text()),
        stick: true
      });

      $(this).draggable({
        zIndex: 999,
        revert: true,
        revertDuration: 0
      });

    //draggable to card list???

    });

    $('#calendar').fullCalendar({
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
      defaultDate: '2016-06-12',
      selectable: true,
      selectHelper: true,
      select: function(start, end) {
        var title = prompt('Event Title:');
        var eventData;
        if (title) {
          eventData = {
            title: title,
            start: start,
            end: end
          };
          $('#calendar').fullCalendar('renderEvent', eventData, true);
        }
        $('#calendar').fullCalendar('unselect');
      },
      editable: true,
      droppable: true,
      drop: function(){$(this).remove();},
      eventLimit: true,
      events: [
        {
          title: 'All Day Event',
          start: '2016-06-01'
        },
        {
          title: 'Long Event',
          start: '2016-06-07',
          end: '2016-06-10'
        },
        {
          id: 999,
          title: 'Repeating Event',
          start: '2016-06-09T16:00:00'
        },
        {
          id: 999,
          title: 'Repeating Event',
          start: '2016-06-16T16:00:00'
        },
        {
          title: 'Conference',
          start: '2016-06-11',
          end: '2016-06-13'
        },
        {
          title: 'Meeting',
          start: '2016-06-12T10:30:00',
          end: '2016-06-12T12:30:00'
        },
        {
          title: 'Lunch',
          start: '2016-06-12T12:00:00'
        },
        {
          title: 'Meeting',
          start: '2016-06-12T14:30:00'
        },
        {
          title: 'Happy Hour',
          start: '2016-06-12T17:30:00'
        },
        {
          title: 'Dinner',
          start: '2016-06-12T20:00:00'
        },
        {
          title: 'Birthday Party',
          start: '2016-06-13T07:00:00'
        },
        {
          title: 'Click for Google',
          url: 'http://google.com/',
          start: '2016-06-28'
        }
      ]
    });

  });

