/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import { SearchInput, CustomLoader, customStyles } from 'src/components/datatables/index'
import DataTable from 'react-data-table-component'
import CIcon from '@coreui/icons-react'
import { cilCloudDownload } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'

// eslint-disable-next-line react/prop-types
const ReactDatatable = ({ columns, data, actions, actionTarget }) => {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const [searchText, setSearchtext] = useState('')
  const [filteredData, setFiltereddata] = useState([])

  function convertArrayOfObjectsToCSV(array) {
    let result;

    const columnDelimiter = ',';
    const lineDelimiter = '\n';
    const keys = Object.keys(data[0]);

    result = '';
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    array.forEach(item => {
      let ctr = 0;
      keys.forEach(key => {
        if (ctr > 0) result += columnDelimiter;

        result += item[key];
        
        ctr++;
      });
      result += lineDelimiter;
    });

    return result;
  }

  function downloadCSV(array) {
    const link = document.createElement('a');
    let csv = convertArrayOfObjectsToCSV(array);
    if (csv == null) return;

    const filename = 'export.csv';

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`;
    }

    link.setAttribute('href', encodeURI(csv));
    link.setAttribute('download', filename);
    link.click();
  }

  const Export = ({ onExport }) => <button className='btn btn-sm btn-primary float-left' onClick={e => onExport(e.target.value)}><CIcon icon={cilCloudDownload} /></button>

  useEffect(() => {
    if(searchText){
      setFiltereddata(data.filter((item) => 
        Object.values(item).some(val => 
          String(val).toLowerCase().includes(searchText.toLowerCase())
        )
      ))
    }else{
      setFiltereddata(data)
    }
  }, [searchText])

  return (
    
    <>
      <DataTable
          columns={columns}
          data={filteredData}
          // progressPending={loading}
          // progressComponent={<CustomLoader />}
          pagination
          // paginationServer
          // paginationTotalRows={10}
          // paginationDefaultPage={0}
          // onChangeRowsPerPage={() => handlePerRowsChange()}
          // paginationRowsPerPageOptions={[10, 20, 30, 40, 50]}
          // onChangePage={() => handlePageChange()}
          subHeader
          subHeaderComponent={<SearchInput submitFunction={() => {}} setSearchtext={setSearchtext} />}
          customStyles={customStyles}
          title={<Export onExport={() => downloadCSV(filteredData)} />}
          actions={actions && <button className='btn btn-sm btn-primary float-left' onClick={() => navigate(actionTarget)}>Create</button>}
      />
    </>
  )
}

export default React.memo(ReactDatatable)
