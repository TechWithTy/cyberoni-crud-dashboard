import Pagination from "@/components/Pagination";
import Table from "@/components/Table"
import { TableItem } from "@/components/TableItem";
import { getAllRecordsDTO } from "@/crud/commonDTO";
import { displayProductDTO } from "@/crud/product";
import React, { useEffect, useState } from 'react'
export const dynamic = 'force-dynamic';
async function Products({ params }: { params: { page: string } }) {
  const page = parseInt(params.page);
  const data = await getData(page) ||{ records: [], totalPages:0 };

  return (
    <main className="flex flex-col items-center  py-5">
      <Table headers={['no.', 'SKU', 'Name', 'Inventory', 'Price', 'Profit', 'Category']}>
        {(data?.records as displayProductDTO[]).map((value, index) => {
          const row: any = [];
          row.push(value.sku);
          row.push(value.name);
          row.push(value.inventory);
          row.push(value.price);
          row.push(value.profitMargin);
          row.push(value.category);


          return <TableItem type="products" key={value.id} index={value.id} row={row}></TableItem>
        })}
      </Table>
      <Pagination currentPage={page} totalPages={data?.totalPages || 0}></Pagination>

    </main>
  )
}



async function getData(page: number) {
  let apiUrl = process.env.API_URL
  let res = await fetch(`${apiUrl}/products/all/${page}`);
  if (res.status == 200) {
    let resJson = await res.json();
    // console.log(resJson.data);
    return (resJson.data as getAllRecordsDTO);
  }

}
export default Products