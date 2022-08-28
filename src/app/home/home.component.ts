import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  dataList = []
  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.httpClient.get(`${environment.apiURL}/ED-GetNews?EmployeeId=3`)
      .subscribe((res: any) => {
        this.dataList = res.data
        console.log(this.dataList)
        // console.log(res.data)
      })
  }

}
