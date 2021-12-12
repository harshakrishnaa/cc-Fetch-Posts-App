import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import  './post.css';

// import { queryAllByAltText } from "@testing-library/react";
import React, { useEffect, useState} from "react";
// import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Pagination  from '@mui/material/Pagination';
import { colors } from '@mui/material';
function Post(){
    const [author, setAuthor] = React.useState([]);
    const [page, setPage] = useState(1);
    var count=0;
    const demo=async()=>{
      const api_call = await fetch(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=`+count);
      console.log(count);
      const data = await api_call.json();
      var allcomment=data["hits"];
      const arr = []
      Object.keys(allcomment).forEach(key => arr.push([allcomment[key]["author"],allcomment[key]["title"],allcomment[key]["created_at"],allcomment[key]["url"]]));
      const arr2=[...author,arr];
      setAuthor(arr2);
      count++;
    };

    useEffect(() => {
      if(count===0)
        demo();
      console.log("this is interval");
      const interval =setInterval(async() => {
        const api_call = await fetch(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=`+count);
        console.log(count);
        const data = await api_call.json();
        var allcomment=data["hits"];
        const arr = []
        Object.keys(allcomment).forEach(key => arr.push([allcomment[key]["author"],allcomment[key]["title"],allcomment[key]["created_at"],allcomment[key]["url"]]));
        const arr2=[...author,arr];
        setAuthor(arr2);
        count++;
    
    }, 10000);
       return()=>clearInterval(interval);
      
}, [page]);

    return(
      <div>
      <TableContainer >
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="center">TITLE</TableCell>
            <TableCell align="center">AUTHOR</TableCell>
            <TableCell align="center">CREATED_AT</TableCell>
           </TableRow>
        </TableHead>
        <TableBody>
        {author.slice(page-1,page).map((data)=>(  
          data.map((data)=>
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } } }>
            <TableCell className="item" align="center"><a className="item" href={data[3]}>{data[1]}</a></TableCell>
            <TableCell align="center">{data[0]}</TableCell>
            <TableCell align="center">{data[2]}</TableCell>
          </TableRow>
            )
        ))} 
        </TableBody>
      </Table>
      <Box py={3} display="flex" justifyContent="center">
          <Pagination
            count={10}
            color="secondary"
            variant="outlined"
            onChange={(e, value) => setPage(value)}
          />
        </Box>
    </TableContainer> 
    </div>
    );
};
export default Post;