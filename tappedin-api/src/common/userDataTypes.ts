export interface UserInfo
{
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password?: string;
    dateCreated: Date;
}

export interface EducationInfo
{
    schoolName: string,
    schoolCity?: string,
    schoolState?: string,
    schoolCountry: string,
    programOfStudy: string,
    dateStarted: Date,
    dateEnded: Date | null,
    expectedGrad: Date,
    currentlyAttending: boolean,
    description?: string
}

export interface UserIdentifier
{
    userID?: string;
    username?: string;
    email?: string;
}

export interface LoginInfo
{
    username?: string;
    password?: string;
}

export type UserFields = EducationInfo;

export enum UserFieldTypes
{
    EDUCATION_INFO = 0
}