import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

export default function BaseTable({ data = [], columns = [], headerTitle = "Table", emptyMessage = "Nenhum item encontrado", buttonLabel = "Button", onClick = () => alert("Insira sua função aqui") }) {
  const header = (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <h1 className="text-xl text-900 font-bold">{headerTitle}</h1>
      <Button label={buttonLabel} onClick={onClick} />
    </div>
  );

  const footer = `No total existem ${data.length} itens.`;

  return (
    <div className="border border-gray-400 rounded-lg mt-4 overflow-hidden">
          <DataTable value={data} header={header} footer={footer} emptyMessage={emptyMessage} tableStyle={{ minWidth: "60rem" }}>
        {columns.map((col, index) => (
          <Column key={index} field={col.field} header={col.header} body={col.body} />
        ))}
      </DataTable>
    </div>
  );
}
