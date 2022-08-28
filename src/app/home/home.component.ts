import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { faPenToSquare, faCircleMinus, faFileCircleCheck, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  dataList = []
  faPenToSquare = faPenToSquare
  faCircleMinus = faCircleMinus
  faFileCircleCheck = faFileCircleCheck
  faCirclePlus = faCirclePlus
  closeResult = ''
  name = ''
  detail = ''
  newsIndex = 0
  isDataChecked = true
  constructor(private httpClient: HttpClient, private modalService: NgbModal) { }

  ngOnInit(): void {
    // const headers = new HttpHeaders()
    //   .append('Content-Type', 'application/json')
    //   .append('Access-Control-Allow-Headers', 'Content-Type')
    //   .append('Access-Control-Allow-Methods', 'GET')
    //   .append('Access-Control-Allow-Origin', '*');

    this.httpClient.get('https://iotboot.com/chivacare/test-xx').subscribe((res: any) => {
      console.log(res)
    })

    this.httpClient.get(`${environment.apiURL}/ED-GetNews?EmployeeId=3`)
      .subscribe((res: any) => {
        this.dataList = res.data
        console.log(this.dataList)
        // console.log(res.data)
      })
  }


  open(content: any, index: any) {
    let data = this.dataList[index]
    this.name = data['NameNews']
    this.detail = data['Detail']
    this.newsIndex = index
    this.isDataChecked = data['Status'] == 1
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {

    });
  }

  toggleStatus(value: any) {
    console.log(value)
  }

  saveNews() {
    let data: any = this.dataList[this.newsIndex]
    let dataStatus = 0
    if (this.isDataChecked) {
      dataStatus = 1
    } else {
      dataStatus = 0
    }
    data['Status'] = dataStatus
    const formData = new FormData()
    formData.append("EmployeeId", '3')
    formData.append("NewsId", '1')
    formData.append("Status", `${dataStatus}`)

    // const headers = new HttpHeaders()
    //   .append('Content-Type', 'application/json')
    //   .append('Access-Control-Allow-Headers', 'Content-Type')
    //   .append('Access-Control-Allow-Methods', 'POST')
    //   .append('Access-Control-Allow-Origin', '*');

    this.httpClient.post(`${environment.apiURL}/ED-UpdateStatusNews`, formData).subscribe((res) => {
      this.modalService.dismissAll()
    })
  }

}
