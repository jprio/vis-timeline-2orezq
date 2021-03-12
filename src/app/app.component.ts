import { Component, OnInit, ViewChild } from '@angular/core';
import { ElementRef, Renderer2 } from '@angular/core';
import { Timeline, DataSet } from 'vis-timeline';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit  {
  timeline: Timeline;
  timeline2: Timeline;
  options: {};
  data: any;
  groups: any;

  @ViewChild('timeline', { static: true }) timelineContainer: ElementRef;
  @ViewChild('timeline2', { static: true }) timelineContainer2: ElementRef;

  constructor() {
    this.getTimelineData();
    this.getTimelineGroups();
    this.getOptions();
  }

  ngOnInit() {
    this.timeline = new Timeline(this.timelineContainer.nativeElement, null, this.options);
    this.timeline.setGroups(this.groups);
    this.timeline.setItems(this.data);  
    this.timeline2 = new Timeline(this.timelineContainer.nativeElement, null, this.options);
    this.timeline2.setGroups(this.groups);
    this.timeline2.setItems(this.data);  
  }

  getTimelineGroups() {
     // create groups
    this.groups = new DataSet([
      {id: 1, content: 'Truck&nbsp;1'},
      {id: 2, content: 'Truck&nbsp;2'},
      {id: 3, content: 'Truck&nbsp;3'},
      {id: 4, content: 'Truck&nbsp;4'}
    ]);
    }

  getTimelineData() {
      // Create a DataSet (allows two way data-binding)
    // create items
    this.data = new DataSet();
    var count = 100;
    var order = 1;
    var truck = 1;
    var max : any = 0.02;

    // create 4 truck groups, then order inside each group
    for (var j = 0; j < 4; j++) {
      var date = new Date();
      for (var i = 0; i < count/4; i++) {
        
        date.setHours(date.getHours() +  4 * Math.random());
        var start = new Date(date);

        date.setHours(date.getHours() + 2 + Math.floor(Math.random()*4));
        var end = new Date(date);

        this.data.add({
          id: order,
          group: truck,
          start: start,
          end: end,
          content: 'Order ' + order
        });

        order++;
      }
      truck++;
    }          
  }

  getOptions() {
    this.options = {
      stack: false,
      start: new Date(),
      end: new Date(1000*60*60*24 + (new Date()).valueOf()),
      editable: true,
      margin: {
        item: 10, // minimal margin between items
        axis: 5   // minimal margin between items and the axis
      },
      orientation: 'top'
    };
  }
}
