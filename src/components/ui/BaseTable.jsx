import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

export default function BaseTable({ data = [], columns = [], headerTitle = "Table", sortMode = "single", sortable = false, emptyMessage = "Nenhum item encontrado", buttonLabel = "Button", onClick = () => alert("Insira sua função aqui") }) {
  const header = (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <h1 className="md:text-xl sm:text-md text-md text-900 font-bold">{headerTitle}</h1>
      <Button icon="pi pi-plus" label={buttonLabel} onClick={onClick} />
    </div>
  );

  const footer = `No total existem ${data.length} itens.`;

  return (
    <div className="border border-gray-400 rounded-lg mt-4 overflow-hidden">
          <DataTable value={data} header={header} sortMode={sortMode} footer={footer} emptyMessage={emptyMessage} tableStyle={{ minWidth: "60rem" }}>
        {columns.map((col, index) => (
          <Column key={index} field={col.field} sortable={col.field === "acoes" ? false : sortable} header={col.header} body={col.body} />
        ))}
      </DataTable>
    </div>
  );
}
