import mysql from 'promise-mysql';

export class Database {
    constructor(
        private host: string = 'localhost',
        private user: string = 'root',
        private password: string = '', 
        private database: string = 'mantenimiento'
    ){}

    public getConnection(): any {
        return mysql.createConnection({
            host: this.host,
            user: this.user,
            password: this.password,
            database: this.database
        });
    }
}