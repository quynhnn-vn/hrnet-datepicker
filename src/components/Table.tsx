import React, { useEffect, useState } from 'react'
import { TiArrowSortedUp, TiArrowSortedDown, TiArrowUnsorted } from 'react-icons/ti'
import { RiDeleteBin2Line } from 'react-icons/ri'
import { DEPARTMENTS, FORM_FIELDS, STATES } from './utils'
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

interface Props {
  tableData: Array<Data>
  onDeleteEmployee: (employee: Data) => void
}

export default function Table(props: Props) {
  const { tableData, onDeleteEmployee } = props

  const [order, setOrder] = useState<boolean | 'asc' | 'desc'>(false)
  const [data, setData] = useState<Data[]>([])

  useEffect(() => {
    setData(tableData)
  }, [tableData])

  const onSortTable = (fieldId: string, fieldType: string) => {
    let _order = order
    if (_order === false || _order === 'desc') {
      _order = 'asc'
    } else {
      _order = 'desc'
    }

    const _data = data
    setData(
      _data.sort((a: Data, b: Data) => {
        const firstValue = a[fieldId as keyof Data],
          secondValue = b[fieldId as keyof Data]

        if (firstValue && secondValue) {
          if (fieldType === 'date') {
            if (_order === 'asc') return new Date(firstValue) > new Date(secondValue) ? 1 : -1
            else return new Date(firstValue) < new Date(secondValue) ? 1 : -1
          } else {
            if (_order === 'asc') return firstValue > secondValue ? 1 : -1
            else return firstValue < secondValue ? 1 : -1
          }
        } else {
          return -1
        }
      }),
    )
    setOrder(_order)
  }

  return (
    <div className='overflow-x-auto'>
      <table className='w-full border-1 shadow rounded mb-4 table-auto'>
        <thead>
          <tr className='h-14 bg-tertiary'>
            {FORM_FIELDS.map((field, index) => (
              <th key={field.id} className={`sm:border-0 border text-center ${index === 0 ? 'rounded-tl' : ''}`}>
                <span className='flex items-center justify-center'>
                  {field.placeholder}
                  <button onClick={() => onSortTable(field.id, field.type)}>
                    {order === false ? (
                      <TiArrowUnsorted />
                    ) : order === 'asc' ? (
                      <TiArrowSortedUp />
                    ) : (
                      <TiArrowSortedDown />
                    )}
                  </button>
                </span>
              </th>
            ))}
            <th className='sm:border-0 border rounded-tr'></th>
          </tr>
        </thead>
        <tbody className='text-center'>
          {data.length ? (
            data.map((employee: Data, index) => (
              <tr key={`row_${index}`} className={index % 2 === 0 ? 'bg-secondary' : ''}>
                {FORM_FIELDS.map((field, index) => {
                  let value = employee[field.id as keyof Data]
                  if (field.type === 'select') {
                    const foundState = STATES.find((state) => state.id == value)
                    const foundDepartment = DEPARTMENTS.find((department) => department.id == value)
                    value =
                      field.id === 'state' && foundState
                        ? foundState.name
                        : field.id === 'department' && foundDepartment
                        ? foundDepartment.name
                        : value
                  }
                  return (
                    <td key={index} className='h-10 sm:border-0 border'>
                      {value}
                    </td>
                  )
                })}
                <td className='sm:border-0 border px-2'>
                  <button onClick={() => onDeleteEmployee(employee)}>
                    <RiDeleteBin2Line size='1.2rem' color='red' />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td className='h-14'>No data available in table</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
