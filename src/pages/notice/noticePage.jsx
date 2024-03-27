import { FaEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import React, { useCallback, useEffect, useState } from 'react'
import "./notice.css"
import { Link } from 'react-router-dom'
import axios from 'axios'
import { getNotices } from '../../services/fetchFunction'
const NoticePage = () => {
    const [notices, setNotices] = useState();

    

    const handleDelete = useCallback(async (id) => {
        if (window.confirm("Are you sure to delete")) {

            try {
                await axios.delete(`http://localhost:8080/api/notice/${id}`, {
                    withCredentials: true
                })
                getData();
                // console.log(response)
            } catch (error) {

            }
        } else {

        }
    }, []);
    const getData = async () => {
        try {
            const data = await getNotices();
            setNotices(data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getData()
    }, [handleDelete])
    return (
        <>
            <div className='heading_edit'>

            <h2>Notices</h2>
            <button className="add"><Link className='link btn' to={"add"}>Add Notices</Link></button>
            </div>
            <table >
                <thead>
                    <tr>
                        <th>For</th>
                        <th>Notice</th>
                        <th>Date</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        notices?.map((notice, index) => {
                            return <tr key={notice.notice_id} className={index % 2 == 0 ? "even" : "odd"}>
                                <td>{notice.class_id ? notice.class_name : "Open Notice"}</td>
                                <td>{notice.notice_text}</td>
                                <td>{notice.date_posted}</td>
                                <td><Link className={"link"}  to={`edit/${notice.notice_id}`}><FaEdit size={20} color="green" /></Link> </td>
                                <td><button onClick={(e) => handleDelete(notice.notice_id)}><MdDelete size={20} color="red" /></button></td>
                            </tr>
                        })
                    }

                </tbody>
            </table>
        </>
    )
}
//(new Date(notice.date_posted.toLocaleString('en-US',UTC+5:45))).toISOString().slice(0,10)
export default NoticePage


