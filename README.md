## typescript-hrnet-table

### typescript-hrnet-table is an open-source typescript react plug-in for rendering a HTML table

### Install

`npm install typescript-hrnet-table`

### Usage

```javascript
import { Table } from 'typescript-hrnet-table';

interface Data {
  id: string
  firstName: string
  lastName: string
  birthday: string
  startDate: string
  street: string
  city: string
  state: string
  zipCode: number
  department: string
}

const data : Array<Data> = [
    {
        id: '1',
        firstName: 'Tony',
        lastName: 'Stark',
        birthday: '31 Oct 1985',
        startDate: '31 Oct 2021',
        street: 'Downtown Street',
        city: 'New York'
        state: 'AS',
        department: '2',
        zipCode: '12345',
    },
    {
        id: '2',
        firstName: 'Bruce',
        lastName: 'Lee',
        birthday: '31 Oct 1980',
        startDate: '31 Oct 2020',
        street: 'Downtown Street',
        city: 'New York'
        state: 'AS',
        department: '2',
        zipCode: '12345',
    }
]

    const onDeleteData = (dataItem: Data) => {
        // delete data
    };

    <Table tableData={data} onDeleteData={onDeleteData}>
```
