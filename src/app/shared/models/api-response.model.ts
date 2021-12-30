export class ApiResponse<dataType> {
    public constructor() {
        this.statusCode = 200;
        this.message = '';
    }
    statusCode: number;
    message: string;
    data!: dataType;
}
