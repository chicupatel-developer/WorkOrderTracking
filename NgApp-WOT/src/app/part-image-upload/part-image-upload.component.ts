import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-part-image-upload',
  templateUrl: './part-image-upload.component.html',
  styleUrls: ['./part-image-upload.component.css']
})
export class PartImageUploadComponent implements OnInit {

  public progress: number;
  public message: string;

  @Input() partId: string;
  @Output() public onUploadFinished = new EventEmitter();

  constructor(private http: HttpClient, public dataService: DataService) { }
  ngOnInit() {
  }

  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }

    let fileToUpload = <File>files[0];
    const formData = new FormData();

    formData.append('partImage', fileToUpload, fileToUpload.name);
    formData.append("partId", this.partId);
    
    this.dataService.partImageUpload(formData).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress)
        this.progress = Math.round(100 * event.loaded / event.total);
      else if (event.type === HttpEventType.Response) {
        this.message = 'Upload success.';
        this.onUploadFinished.emit(event.body);
        console.log(this.message);
      }
    });
  }

}
