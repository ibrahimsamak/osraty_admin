import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { appConstant } from "./_constant/appConstant";
import { Observable } from "rxjs";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
const EXCEL_TYPE =
	"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const EXCEL_EXTENSION = ".xlsx";

@Injectable({
  providedIn: "root"
})
export class ConstantService {
  constructor(private http: HttpClient) {}


  public exportAsExcelFile(json: any[], excelFileName: string): void {
		const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
		const workbook: XLSX.WorkBook = {
			Sheets: { data: worksheet },
			SheetNames: ["data"],
		};
		const excelBuffer: any = XLSX.write(workbook, {
			bookType: "xlsx",
			type: "array",
		});
		this.saveAsExcelFile(excelBuffer, excelFileName);
	}
	private saveAsExcelFile(buffer: any, fileName: string): void {
		const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
		FileSaver.saveAs(
			data,
			fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
		);
	}

  GetCurrentUserToken() {
    let userObj = JSON.parse(localStorage.getItem("auth_user"));
    return userObj["token"];
  }

  GeneralGetRequest(url: String) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json",
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.GetCurrentUserToken()
      })
    };

    return this.http.get(appConstant.BASE_URL + url, httpOptions);
  }

  GeneralPosttRequest(url, content) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json",
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.GetCurrentUserToken()
      })
    };

    return this.http.post(
      appConstant.BASE_URL + url,
      JSON.stringify(content),
      httpOptions
    );
  }

  ///////////////////////////////////////////////////

  login(conent) {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*"
      })
    };

    return this.http.post(
      appConstant.BASE_URL + `loginsuperAdmin`,
      JSON.stringify(conent),
      httpOptions
    );
  }

  refreshtoken(conent) {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.GetCurrentUserToken()
      })
    };

    return this.http.post(
      appConstant.BASE_URL + `refreshtokenAdmin`,
      JSON.stringify(conent),
      httpOptions
    );
  }

  blockUser(conent, id) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json",
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.GetCurrentUserToken()
      })
    };
    return this.http.post(
      appConstant.BASE_URL + "user_block/" + id,
      JSON.stringify(conent),
      httpOptions
    );
  }

  getSearchUserData(conent, page) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json",
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.GetCurrentUserToken()
      })
    };

    return this.http.post(
      appConstant.BASE_URL + "usersSearch?page=" + page + "&limit=20",
      JSON.stringify(conent),
      httpOptions
    );
  }

  blockAdmin(conent, id) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json",
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.GetCurrentUserToken()
      })
    };
    return this.http.post(
      appConstant.BASE_URL + "admin_block/" + id,
      JSON.stringify(conent),
      httpOptions
    );
  }

  getSearchAdminData(conent, page) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json",
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.GetCurrentUserToken()
      })
    };

    return this.http.post(
      appConstant.BASE_URL + "adminsSearch?page=" + page + "&limit=20",
      JSON.stringify(conent),
      httpOptions
    );
  }

  CreateSuperAdminData(conent) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "multipart/form-data",
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.GetCurrentUserToken()
      })
    };
    return this.http.post(
      appConstant.BASE_URL + "superadmin",
      JSON.stringify(conent),
      httpOptions
    );
  }

  DeleteSuperAdminData(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json",
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.GetCurrentUserToken()
      })
    };

    return this.http.post(
      appConstant.BASE_URL + `superadmin/${id}`,
      {},
      httpOptions
    );
  }

  UpdateSuperAdminData(id, conent) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "multipart/form-data",
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.GetCurrentUserToken()
      })
    };

    return this.http.put(
      appConstant.BASE_URL + `superadmin/${id}`,
      JSON.stringify(conent),
      httpOptions
    );
  }

  UpdateStaticPageData(id, conent) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json",
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.GetCurrentUserToken()
      })
    };

    return this.http.put(
      appConstant.BASE_URL + `staticpage/${id}`,
      JSON.stringify(conent),
      httpOptions
    );
  }


  UpdateBankAccountData(id, conent) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json",
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.GetCurrentUserToken()
      })
    };

    return this.http.put(
      appConstant.BASE_URL + `bankaccount/${id}`,
      JSON.stringify(conent),
      httpOptions
    );
  }

  CreateStaticPageData(conent) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json",
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.GetCurrentUserToken()
      })
    };
    return this.http.post(
      appConstant.BASE_URL + "staticpage",
      JSON.stringify(conent),
      httpOptions
    );
  }

  addBankDetails(content) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json",
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.GetCurrentUserToken()
      })
    };

    return this.http.post(
      appConstant.BASE_URL + `BankDetails`,
      JSON.stringify(content),
      httpOptions
    );
  }

  DeleteStaticPageData(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json",
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.GetCurrentUserToken()
      })
    };

    return this.http.post(
      appConstant.BASE_URL + `staticpage/${id}`,
      {},
      httpOptions
    );
  }

  DeleteBanckAccountData(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json",
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.GetCurrentUserToken()
      })
    };

    return this.http.post(
      appConstant.BASE_URL + `bankaccount/${id}`,
      {},
      httpOptions
    );
  }

  rpt_history(page, content) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json",
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.GetCurrentUserToken()
      })
    };
    return this.http.post(
      appConstant.BASE_URL + `rpt_history?page=${page}&limit=10`,
      JSON.stringify(content),
      httpOptions
    );
  }

  rpt_funder(page, content) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json",
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.GetCurrentUserToken()
      })
    };
    return this.http.post(
      appConstant.BASE_URL + `rpt_funder?page=${page}&limit=10`,
      JSON.stringify(content),
      httpOptions
    );
  }


  rpt_funder_excel(content) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json",
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.GetCurrentUserToken()
      })
    };
    return this.http.post(
      appConstant.BASE_URL + `rpt_funder_excel`,
      JSON.stringify(content),
      httpOptions
    );
  }

  rpt_beneficiary(page, content) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json",
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.GetCurrentUserToken()
      })
    };
    return this.http.post(
      appConstant.BASE_URL + `rpt_beneficiary?page=${page}&limit=10`,
      JSON.stringify(content),
      httpOptions
    );
  }

  rpt_beneficiary_excel(content) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json",
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.GetCurrentUserToken()
      })
    };
    return this.http.post(
      appConstant.BASE_URL + `rpt_beneficiary_excel`,
      JSON.stringify(content),
      httpOptions
    );
  }

  rpt_request(page, content) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json",
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.GetCurrentUserToken()
      })
    };
    return this.http.post(
      appConstant.BASE_URL + `rpt_request?page=${page}&limit=10`,
      JSON.stringify(content),
      httpOptions
    );
  }

  getSearchRequestData(conent, page) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json",
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.GetCurrentUserToken()
      })
    };

    return this.http.post(
      appConstant.BASE_URL + "requestSearch?page=" + page + "&limit=20",
      JSON.stringify(conent),
      httpOptions
    );
  }

  agreementRequest(conent) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json",
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.GetCurrentUserToken()
      })
    };
    return this.http.post(
      appConstant.BASE_URL + "updateRequestByAdmin",
      JSON.stringify(conent),
      httpOptions
    );
  }

  addPaymentForUser(conent) {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.GetCurrentUserToken()
      })
    };

    return this.http.post(
      appConstant.BASE_URL + `PaymentToUser`,
      JSON.stringify(conent),
      httpOptions
    );
  }

  getlast20PaymentForUser(conent) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json",
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.GetCurrentUserToken()
      })
    };

    return this.http.post(
      appConstant.BASE_URL + `getlast20PaymentForUser`,
      JSON.stringify(conent),
      httpOptions
    );
  }

  verfiyPayment(conent) {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.GetCurrentUserToken()
      })
    };

    return this.http.post(
      appConstant.BASE_URL + `verfiyPayment`,
      JSON.stringify(conent),
      httpOptions
    );
  }

  DeleteJobssData(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json",
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.GetCurrentUserToken()
      })
    };

    return this.http.post(appConstant.BASE_URL + `jobs/${id}`, {}, httpOptions);
  }

  UpdateJobssData(id, conent) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json",
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.GetCurrentUserToken()
      })
    };

    return this.http.put(
      appConstant.BASE_URL + `jobs/${id}`,
      JSON.stringify(conent),
      httpOptions
    );
  }

  CreateJobsData(conent) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json",
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.GetCurrentUserToken()
      })
    };
    return this.http.post(
      appConstant.BASE_URL + "jobs",
      JSON.stringify(conent),
      httpOptions
    );
  }

  getSearchContactData(conent) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json",
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.GetCurrentUserToken()
      })
    };

    return this.http.post(
      appConstant.BASE_URL + "contactSearch",
      JSON.stringify(conent),
      httpOptions
    );
  }

  DeleteContactData(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json",
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.GetCurrentUserToken()
      })
    };

    return this.http.post(
      appConstant.BASE_URL + `contact/${id}`,
      {},
      httpOptions
    );
  }

  UpdatepaymentmethodData(id, conent) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json",
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.GetCurrentUserToken()
      })
    };

    return this.http.put(
      appConstant.BASE_URL + `paymentmethod/${id}`,
      JSON.stringify(conent),
      httpOptions
    );
  }

  CreatepaymentmethodData(conent) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json",
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.GetCurrentUserToken()
      })
    };
    return this.http.post(
      appConstant.BASE_URL + "paymentmethod",
      JSON.stringify(conent),
      httpOptions
    );
  }

  DeletepaymentmethodData(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json",
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.GetCurrentUserToken()
      })
    };

    return this.http.post(
      appConstant.BASE_URL + `paymentmethod/${id}`,
      {},
      httpOptions
    );
  }

  UpdatepaymentforData(id, conent) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json",
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.GetCurrentUserToken()
      })
    };

    return this.http.put(
      appConstant.BASE_URL + `paymentfor/${id}`,
      JSON.stringify(conent),
      httpOptions
    );
  }

  DeletepaymentforData(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json",
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.GetCurrentUserToken()
      })
    };

    return this.http.post(
      appConstant.BASE_URL + `paymentfor/${id}`,
      {},
      httpOptions
    );
  }

  CreateBankFileData(conent) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "multipart/form-data",
        // 'Accept': 'application/json',
        // 'Content-Type': 'application/json; charset=utf-8',
        "Access-Control-Allow-Origin": "*",
        token: this.GetCurrentUserToken()
      })
    };
    const formData: FormData = new FormData();
    formData.append("filename", conent.image);
    formData.append("title", conent.title);

    return this.http.post(
      appConstant.BASE_URL + "BankFile",
      formData,
      httpOptions
    );
  }

  CreatepaymentforData(conent) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json",
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.GetCurrentUserToken()
      })
    };
    return this.http.post(
      appConstant.BASE_URL + "paymentfor",
      JSON.stringify(conent),
      httpOptions
    );
  }

  UpdateBankFileData(id, conent) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "multipart/form-data",
        // 'Accept': 'application/json',
        // 'Content-Type': 'application/json; charset=utf-8',
        "Access-Control-Allow-Origin": "*",
        token: this.GetCurrentUserToken()
      })
    };
    const formData: FormData = new FormData();
    formData.append("filename", conent.image);
    formData.append("title", conent.title);

    return this.http.post(
      appConstant.BASE_URL + "BankFile/" + id,
      formData,
      httpOptions
    );
  }

  DeletenewsData(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json",
        Accept: "application/json",
        token: this.GetCurrentUserToken(),
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*"
      })
    };

    return this.http.post(appConstant.BASE_URL + `news/${id}`, {}, httpOptions);
  }

  UpdatenewsData(id, conent) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "multipart/form-data",
        // 'Accept': 'application/json',
        // 'Content-Type': 'application/json; charset=utf-8',
        "Access-Control-Allow-Origin": "*",
        token: this.GetCurrentUserToken()
      })
    };
    const formData: FormData = new FormData();
    formData.append("filename", conent.image);
    formData.append("title", conent.title);
    formData.append("details", conent.details);
    formData.append("type", conent.type);
    formData.append("place", conent.place);

    return this.http.put(
      appConstant.BASE_URL + `news/${id}`,
      formData,
      httpOptions
    );
  }

  CreateNewstData(conent) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "multipart/form-data",
        // 'Accept': 'application/json',
        // 'Content-Type': 'application/json; charset=utf-8',
        "Access-Control-Allow-Origin": "*",
        token: this.GetCurrentUserToken()
      })
    };
    const formData: FormData = new FormData();
    formData.append("filename", conent.image);
    formData.append("title", conent.title);
    formData.append("details", conent.details);
    formData.append("type", conent.type);
    formData.append("place", conent.place);

    return this.http.post(appConstant.BASE_URL + "news", formData, httpOptions);
  }

  getUserWithPaginationData(page) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json",
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.GetCurrentUserToken()
      })
    };

    return this.http.get(
      appConstant.BASE_URL + "users?page=" + page + "&limit=30",
      httpOptions
    );
  }

  getAdminWithPaginationData(page) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json",
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.GetCurrentUserToken()
      })
    };

    return this.http.get(
      appConstant.BASE_URL + "admin?page=" + page + "&limit=30",
      httpOptions
    );
  }

  getSuperAdminData() {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json",
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.GetCurrentUserToken()
      })
    };

    return this.http.get(appConstant.BASE_URL + "superadmin", httpOptions);
  }

  getSingleSuperAdminData(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json",
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.GetCurrentUserToken()
      })
    };

    return this.http.get(
      appConstant.BASE_URL + `superadmin/${id}`,
      httpOptions
    );
  }

  getBankDetails(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json",
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.GetCurrentUserToken()
      })
    };

    return this.http.get(
      appConstant.BASE_URL + `BankDetails/${id}`,
      httpOptions
    );
  }

  getStaticPagenData() {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json",
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.GetCurrentUserToken()
      })
    };

    return this.http.get(appConstant.BASE_URL + "staticpage", httpOptions);
  }

  getBankAccountData() {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json",
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.GetCurrentUserToken()
      })
    };

    return this.http.get(appConstant.BASE_URL + "bankaccount", httpOptions);
  }

  getSingleStaticPagenData(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json",
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.GetCurrentUserToken()
      })
    };

    return this.http.get(
      appConstant.BASE_URL + `staticpage/${id}`,
      httpOptions
    );
  }

  getSingleBankAccountData(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json",
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.GetCurrentUserToken()
      })
    };

    return this.http.get(
      appConstant.BASE_URL + `bankaccount/${id}`,
      httpOptions
    );
  }

  getpaymentforUserData(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json",
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.GetCurrentUserToken()
      })
    };

    return this.http.get(
      appConstant.BASE_URL + "getActiveRequestUser/" + id,
      httpOptions
    );
  }

  getRequestBySuperAdmin(page) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json",
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.GetCurrentUserToken()
      })
    };
    return this.http.get(
      appConstant.BASE_URL + "RequestBySuperAdmin?page=" + page + "&limit=20",
      httpOptions
    );
  }

  getLastRequest(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json",
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.GetCurrentUserToken()
      })
    };

    return this.http.get(
      appConstant.BASE_URL + "LastRequest/" + id,
      httpOptions
    );
  }

  getUserData() {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json",
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.GetCurrentUserToken()
      })
    };

    return this.http.get(appConstant.BASE_URL + "users", httpOptions);
  }

  getAdminData() {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json",
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.GetCurrentUserToken()
      })
    };

    return this.http.get(appConstant.BASE_URL + "admin", httpOptions);
  }

  getJobsData() {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json",
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.GetCurrentUserToken()
      })
    };

    return this.http.get(appConstant.BASE_URL + "jobs", httpOptions);
  }

  getpaymentmethodData() {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json",
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.GetCurrentUserToken()
      })
    };

    return this.http.get(appConstant.BASE_URL + "paymentmethod", httpOptions);
  }

  getMotstMethodType() {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json",
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.GetCurrentUserToken()
      })
    };

    return this.http.get(
      appConstant.BASE_URL + "getMotstMethodType",
      httpOptions
    );
  }

  getMethodFor() {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json",
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.GetCurrentUserToken()
      })
    };

    return this.http.get(appConstant.BASE_URL + "getMethodFor", httpOptions);
  }

  getUsersPerYear() {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json",
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.GetCurrentUserToken()
      })
    };

    return this.http.get(appConstant.BASE_URL + "getUsersPerYear", httpOptions);
  }

  getSinglenewsData(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json",
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.GetCurrentUserToken()
      })
    };

    return this.http.get(
      appConstant.BASE_URL + `singlenews/${id}`,
      httpOptions
    );
  }

  PaymentPerYear() {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json",
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.GetCurrentUserToken()
      })
    };

    return this.http.get(appConstant.BASE_URL + "PaymentPerYear", httpOptions);
  }

  PaymentPerYear2() {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json",
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.GetCurrentUserToken()
      })
    };

    return this.http.get(appConstant.BASE_URL + "PaymentPerYear2", httpOptions);
  }

  getContactUsData(page) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json",
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.GetCurrentUserToken()
      })
    };

    return this.http.get(
      appConstant.BASE_URL + "contact?page=" + page + "&limit=10",
      httpOptions
    );
  }

  getpaymentforData() {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json",
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.GetCurrentUserToken()
      })
    };

    return this.http.get(appConstant.BASE_URL + "paymentfor", httpOptions);
  }

  getSingleFileData(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json",
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.GetCurrentUserToken()
      })
    };

    return this.http.get(appConstant.BASE_URL + `BankFile/${id}`, httpOptions);
  }

  getFileData() {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json",
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.GetCurrentUserToken()
      })
    };

    return this.http.get(appConstant.BASE_URL + `BankFile`, httpOptions);
  }

  getEventData() {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json",
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.GetCurrentUserToken()
      })
    };

    return this.http.get(
      appConstant.BASE_URL + "news/2?page=0&limit=100",
      httpOptions
    );
  }

  getnewsData() {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json",
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.GetCurrentUserToken()
      })
    };

    return this.http.get(
      appConstant.BASE_URL + "news/1?page=0&limit=100",
      httpOptions
    );
  }

  getAttend(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json",
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.GetCurrentUserToken()
      })
    };

    return this.http.get(
      appConstant.BASE_URL + `getAttend/${id}?page=0&limit=100`,
      httpOptions
    );
  }

  getAdminsPerYear() {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json",
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.GetCurrentUserToken()
      })
    };

    return this.http.get(
      appConstant.BASE_URL + "getAdminsPerYear",
      httpOptions
    );
  }

  CreateGeneralNotificationForMultiple(deviceId, msg) {
    return new Observable(obs => {
      let postModel = {
        notification: {
          title: msg.title,
          body: msg.body,
          sound: "default"
          // "click_action": "FCM_PLUGIN_ACTIVITY",
          // "icon": "fcm_push_icon"
        },
        data: {
          title: msg.title,
          body: msg.body,
          sound: "default",
          data: ""
        },
        registration_ids: deviceId
      };
      console.log(postModel);
      var data = JSON.stringify(postModel);
      var xhr = new XMLHttpRequest();
      //xhr.withCredentials = true;

      xhr.addEventListener("readystatechange", function() {
        if (this.readyState === 4) {
          console.log(this.responseText);
        }
      });

      xhr.open("POST", "https://fcm.googleapis.com/fcm/send");
      xhr.setRequestHeader(
        "Authorization",
        "key=AAAAqt1KWqo:APA91bGORnlJSjsolVNsBTp8WWUE9w8R_yAX77KJNThmwSBum6fDKAwTTzJChayvU1yNzxOK806Z1lGG05m_pUmrQoirSfcpaZV8lv5Gx_-NAW_XZaOeQpcgNUOfTBPzmeyDmtNUbA3k"
      );
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(data);
    });
  }
  ////////////////////////////////////////////////////
}
