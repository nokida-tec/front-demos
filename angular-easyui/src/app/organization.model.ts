export interface IOrganization {
    id?: number;
    name?: string;
}

export class Organization implements IOrganization {
    constructor(public id?: number, public name?: string) {}
}

export interface ICompany {
    id?: number;
    name?: string;
}

export class Company implements ICompany {
    constructor(public id?: number, public name?: string) {}
}

export interface IMember {
    id?: number;
    name?: string;
}

export class Member implements IMember {
    constructor(public id?: number, public name?: string) {}
}