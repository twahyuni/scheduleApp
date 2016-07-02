//create schedule
function createSchedule(){
  //404 forbidden, use CSRF token
  $.ajax({
    url: '/schedule',
    method: 'POST',
    data: {'_csrf': $( "meta[name='csrf-token']").attr('content')},
    success: function(response){
      window.location.href='/schedule?id=' + response;
    }
  });
}


//delete schedule
function deleteSchedule(){
  id = $('#idInfo').val();
  $.ajax({
    url: '/schedule/delete/' + id,
    method: 'DELETE',
    data: {'_csrf': $( "meta[name='csrf-token']").attr('content')},
    success: function(){
      // doesn't redirect
      // window.location.reload('/dashboard');
      window.location.href ='/dashboard';
    }
  });
}

//generate schedule
function generateSchedule(){

}

// function createCard() {
//   $.ajax({
//     url: '/card',
//     data: {

//     }
//     method: 'POST',
//     success: function(response){
//       window.location.href='/schedule';
//     }
//   });
//   //call the loop
// }

$(document).ready(function() {
  // SCHEDULE PAGE
    $(document).on("click", ".popover .close" , function(e){
      $(this).parents(".popover").popover('hide');
    });

    //when create schedule  click, create schedule
    $('.createSchedule').on("click", createSchedule);

    //when delete shedule click, delete schedule
    $('.deleteSchedule').on("click", deleteSchedule);

    //when title and description key up, update schedule db
    document.addEventListener('keydown', function(e){
      var esc = event.which == 27,
          enter = event.which == 13,
          el = event.target,
          input = el.nodeName != 'INPUT' && el.nodeName != 'TEXTAREA',
          // data = {};
          id = $('#idInfo').val();

      if (input) {
        if (esc) {
          // restore state
          document.execCommand('undo');
          el.blur();
        } else if (enter) {
          var data  = el.innerHTML;
          var name  = $('#scheduleTitle').text();
          var desc = $('#scheduleDescription').text();

          if ($(el).attr('class')==='sName'){
            name  = data;
          } else{
            desc = data;
          }

          $.ajax({
            url:  /schedule/ + id,
            data: {'_csrf': $( "meta[name='csrf-token']").attr('content'), name: name, desc: desc},
            type: 'PUT'
          });

          el.blur();
          event.preventDefault();
        }
      }
    }, true);

    //when create card  click, create card
    // $('.createCard').on("click", createCard);

    //when delete card click, remove card

    //update card

    //draggable to card list
      var isEventOverDiv = function(x, y) {
        var external_events = $( '#external-events' );
        var offset = external_events.offset();
        offset.right = external_events.width() + offset.left;
        offset.bottom = external_events.height() + offset.top;
          if (x >= offset.left
              && y >= offset.top
              && x <= offset.right
              && y <= offset.bottom) { return true; }
          return false;
      }

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
    });

    $('#calendar').fullCalendar({
      header: {
        left: 'prevYear,nextYear prev,next',
        center: 'title',
        right: 'today month,agendaWeek,agendaDay'
      },
      selectable: true,
      selectHelper: true,
      // edit this function so you can create card by clicking the calendar
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

      eventRender: function(event, element) {
        element.append( "<span class='closeon'>&times;</span>" );
        element.find(".closeon").click(function() {
           $('#calendar').fullCalendar('removeEvents',event._id);
        });
        // deleting on backend side ?
      },

      eventDragStop: function( event, jsEvent, ui, view ) {
        if(isEventOverDiv(jsEvent.clientX, jsEvent.clientY)) {
          $('#calendar').fullCalendar('removeEvents', event._id);
          var el = $( "<div class='fc-event col-sm-12 fc-event ui-draggable ui-draggable-handle'>" ).appendTo( '#external-events-listing' ).text( event.title );
          el.draggable({
            zIndex: 999,
            revert: true,
            revertDuration: 0
          });
          el.data('event', { title: event.title, id :event.id, stick: true });
        }
      },
      eventSources: [{
        url: '/card/list',
        type: 'GET'
      }],
      // PUT EVENT SOURCES JSON
      // events: [
      //   {
      //     title: 'All Day Event',
      //     start: '2016-06-01'
      //   },
      //   {
      //     title: 'Long Event',
      //     start: '2016-06-07',
      //     end: '2016-06-10'
      //   },
      //   {
      //     id: 999,
      //     title: 'Repeating Event',
      //     start: '2016-06-09T16:00:00'
      //   },
      //   {
      //     id: 999,
      //     title: 'Repeating Event',
      //     start: '2016-06-16T16:00:00'
      //   },
      //   {
      //     title: 'Conference',
      //     start: '2016-06-11',
      //     end: '2016-06-13'
      //   },
      //   {
      //     title: 'Meeting',
      //     start: '2016-06-12T10:30:00',
      //     end: '2016-06-12T12:30:00'
      //   },
      //   {
      //     title: 'Lunch',
      //     start: '2016-06-12T12:00:00'
      //   },
      //   {
      //     title: 'Meeting',
      //     start: '2016-06-12T14:30:00'
      //   },
      //   {
      //     title: 'Happy Hour',
      //     start: '2016-06-12T17:30:00'
      //   },
      //   {
      //     title: 'Dinner',
      //     start: '2016-06-12T20:00:00'
      //   },
      //   {
      //     title: 'Birthday Party',
      //     start: '2016-06-13T07:00:00'
      //   },
      //   {
      //     title: 'Click for Google',
      //     url: 'http://google.com/',
      //     start: '2016-06-28'
      //   }
      // ],

      // edit this event so it pop up with the card information
      eventClick: function(calEvent, jsEvent, view) {

        alert('Event: ' + calEvent.title);
        alert('View: ' + view.name);
        alert('Event: ' + calEvent.start);

      }
      // dayClick: function(date, allDay, jsEvent, view) {
      // if(view.name != 'month')
      //   return;

      //   $('#calendar').fullCalendar('changeView', 'agendaDay')
      //                 .fullCalendar('gotoDate', date);
      // }

    });

  });

