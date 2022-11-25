export interface UserInfo
{
    authID: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    dateCreated: Date;
    isBusinessAccount: boolean;
}

export interface EducationInfo
{
    schoolName: string;
    schoolCity?: string;
    schoolState?: string;
    schoolCountry: string;
    programOfStudy: string;
    dateStarted: Date;
    dateEnded?: Date;
    expectedGrad: Date;
    schoolAddress: string;
    currentlyAttending: boolean;
    description?: string;
}

export interface WorkInfo
{
    workName: string;
    workCity?: string;
    workState?: string;
    workCountry: string;
    workPositionName: string;
    workAddress: string;
    dateStarted: Date;
    dateEnded?: Date;
    currentlyWorking: boolean;
    description?: string;
}

export interface InterestInfo
{
    interestName: string;
    description: string;
}

export interface AboutMeInfo
{
    aboutMeText: string;
}

export interface LocationInfo
{
    location: string;
}

export interface UserIdentifier
{
    authID?: string;
    userID?: string;
    username?: string;
    email?: string;
}

export interface LoginInfo
{
    username?: string;
    password?: string;
}

export interface CoverImage
{
    imageUrl?: string;
}

export interface ProfileImage
{
    imageUrl?: string;
}

export type UserFields = EducationInfo | WorkInfo | AboutMeInfo | LocationInfo | CoverImage | InterestInfo;

export enum UserFieldTypes
{
    EDUCATION_INFO   = 0,
    WORK_INFO        = 1,
    LOCATION_INFO    = 2,
    ABOUT_ME_INFO    = 3,
    SOCIAL_INFO      = 4,
    INTEREST_INFO    = 5,
    COVER_IMAGE_INFO = 6,
    USER_INFO        = 7,
    CONTACT_INFO     = 8,
    PROFILE_IMAGE_INFO     = 9
}