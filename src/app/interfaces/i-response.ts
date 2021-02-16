export interface IUser {
    id: number;
    emp_name: string;
    emp_code: string;
    mobile_no: string;
    userid: string;
    emp_team: string;
    decorative_designation: string;
    new_designation: string;
    base_location: string;
    current_location: string;
    rm_name: string;
    rm_emp_id: string;
    rm_email: string;
    team_lead_id: string;
    team_lead_name: string;
    team_lead_email: string;
    password_text: string;
    super_admin: string;
    employee: string;
    rm: string;
    office_lead: string;
    team_lead: string;
    updated_timestamp?: string;
    created_at?: string;
    status: string;
    intern: string;
    hr: string;
}

export interface ISuccess {
    status: string;
    valid: boolean;
}

export interface IMessage {
    message: string;
    valid?: boolean;
}

export interface IUserInfo {
    userinfo: IUser;
}

export interface IError {
    info: any;
}

export interface ILoginSuccess extends ISuccess {
    result: ILoginResult;
}

export interface IVerifyTokenResult extends IMessage, IUserInfo { }

export interface IVerifyTokenSuccess extends ISuccess {
    result: IVerifyTokenResult;
}

export interface ILoginResponse extends ISuccess, IError, ILoginSuccess { }
export interface ILoginResult extends IMessage, IUserInfo { }
export interface ILogoutReponse extends ISuccess, IError, ILoginSuccess { }