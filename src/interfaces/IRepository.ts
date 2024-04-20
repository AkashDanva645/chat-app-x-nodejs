

export default interface IRepository {
    getById(id: string): Promise<object | null>,
    getAll(): Promise<object[]>,
    create(dto: object): Promise<object>,
    updateById(id: string, updateDTO: object): Promise<object>,
    deleteById(id: string): Promise<object | null>,
}