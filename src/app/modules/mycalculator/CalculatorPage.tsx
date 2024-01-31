import React from 'react'
import { KTIcon, toAbsoluteUrl } from '../../../_metronic/helpers';
import { KTSVG } from "../../../_metronic/helpers";
import {Modal} from 'react-bootstrap'

export default function CalculatorPage() {
    return (
        <>

        <div className='mycalculator'>
            <h3 className='estate-title d-flex align-items-start flex-column'>
                <span className='mb-1 d-block'>My Calculator</span>
                <span className='text-muted mt-2 d-block'>Estimate how much you could be paying for your repayment mortgage during and after your initial term.</span>
            </h3>
            <div className='cal_button'>
                <CalculatorNewModal />
            </div>
        </div>
        <br/> <br/>
        <PropertyCalculator />
        <br/> <br/>
        <CalculatorNew />
        </>
    )    
}

export function PropertyCalculator() {
    return (
        <>
            <div className="card">
            {/* begin::Header */}
                <div className='card-header mycalculator border-0 pt-6 pb-3'>
                    <h3 className='estate-title d-flex align-items-start flex-column'>
                        <span className='mb-1 d-block'>Property Calculator</span>
                        <span className='text-muted mt-2 d-block'>Estimate how much you could be paying for your repayment mortgage during and after your initial term.</span>
                    </h3>
                    <div className='card-toolbar'>
                        <CalculatorNewModal />
                    </div>
                </div>
                
                {/* end::Header */}
                {/* begin::Body */}
            <div className='card-body calculatorTable py-3'>
                {/* begin::Table container */}
                <div className='table-responsive'>
                {/* begin::Table */}
                <table className='table align-middle gy-4'>
                    {/* begin::Table head */}
                    <thead>
                        <tr className=''>
                            <th className='ps-4 rounded-start'>SI No</th>
                            <th className=''>Name</th>
                            <th className=''>Grade</th>
                            <th className=''>Amount</th>
                            <th className=''>Created On</th>
                            <th className='rounded-end'>Actions</th>
                        </tr>
                    </thead>
                    {/* end::Table head */}
                    {/* begin::Table body */}
                    <tbody>
                        <tr>
                            <td>
                                <span className='text-dark fw-bold d-block'>1</span>
                            </td>
                            <td>
                                <div className='d-flex align-items-center'>
                                    <div className='symbol symbol-40px me-5'>
                                        <img
                                            src={toAbsoluteUrl('/media/stock/600x400/img-1.jpg')}
                                            className='rounded-circle'
                                            alt=''
                                        />
                                    </div>
                                    <div className='d-flex justify-content-start flex-column'>
                                        <a href='javascript:void(0)' className='text-dark fw-bold'>
                                            Anand Property
                                        </a>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <span className='text-dark fw-bold d-block'>Grade A</span>
                            </td>
                            <td>
                                <span className='text-dark fw-bold d-block'>1,00,000</span>
                            </td>
                            <td>
                                <span className='text-dark fw-bold d-block'> 14th June 2023 | 11:00AM</span>
                            </td>
                            <td className=''>
                                <a href='javascript:void(0)' className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'>
                                    <img src={toAbsoluteUrl('/media/icons/estate/edit_icon.svg')} className='' alt=''/>
                                </a>
                                <a href='javascript:void(0)' className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'>
                                    <img src={toAbsoluteUrl('/media/icons/estate/more_icon.svg')} className='' alt=''/>
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span className='text-dark fw-bold d-block'>2</span>
                            </td>
                            <td>
                                <div className='d-flex align-items-center'>
                                    <div className='symbol symbol-40px me-5'>
                                        <img
                                            src={toAbsoluteUrl('/media/stock/600x400/img-2.jpg')}
                                            className='rounded-circle'
                                            alt=''
                                        />
                                    </div>
                                    <div className='d-flex justify-content-start flex-column'>
                                        <a href='javascript:void(0)' className='text-dark fw-bold'>
                                            Sagayaraj Property
                                        </a>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <span className='text-dark fw-bold d-block'>Grade B</span>
                            </td>
                            <td>
                                <span className='text-dark fw-bold d-block'>2,00,000</span>
                            </td>
                            <td>
                                <span className='text-dark fw-bold d-block'> 12th June 2023 | 11:00AM</span>
                            </td>
                            <td className=''>
                                <a href='javascript:void(0)' className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'>
                                    <img src={toAbsoluteUrl('/media/icons/estate/edit_icon.svg')} className='' alt=''/>
                                </a>
                                <a href='javascript:void(0)' className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'>
                                    <img src={toAbsoluteUrl('/media/icons/estate/more_icon.svg')} className='' alt=''/>
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span className='text-dark fw-bold d-block'>3</span>
                            </td>
                            <td>
                                <div className='d-flex align-items-center'>
                                    <div className='symbol symbol-40px me-5'>
                                        <img
                                            src={toAbsoluteUrl('/media/stock/600x400/img-3.jpg')}
                                            className='rounded-circle'
                                            alt=''
                                        />
                                    </div>
                                    <div className='d-flex justify-content-start flex-column'>
                                        <a href='javascript:void(0)' className='text-dark fw-bold'>
                                            Gopinath
                                        </a>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <span className='text-dark fw-bold d-block'>Grade C</span>
                            </td>
                            <td>
                                <span className='text-dark fw-bold d-block'>3,00,000</span>
                            </td>
                            <td>
                                <span className='text-dark fw-bold d-block'> 17th June 2023 | 11:30AM</span>
                            </td>
                            <td className=''>
                                <a href='javascript:void(0)' className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'>
                                    <img src={toAbsoluteUrl('/media/icons/estate/edit_icon.svg')} className='' alt=''/>
                                </a>
                                <a href='javascript:void(0)' className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'>
                                    <img src={toAbsoluteUrl('/media/icons/estate/more_icon.svg')} className='' alt=''/>
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span className='text-dark fw-bold d-block'>4</span>
                            </td>
                            <td>
                                <div className='d-flex align-items-center'>
                                    <div className='symbol symbol-40px me-5'>
                                        <img
                                            src={toAbsoluteUrl('/media/stock/600x400/img-4.jpg')}
                                            className='rounded-circle'
                                            alt=''
                                        />
                                    </div>
                                    <div className='d-flex justify-content-start flex-column'>
                                        <a href='javascript:void(0)' className='text-dark fw-bold'>
                                            Maadhuri
                                        </a>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <span className='text-dark fw-bold d-block'>Grade A</span>
                            </td>
                            <td>
                                <span className='text-dark fw-bold d-block'>8,00,000</span>
                            </td>
                            <td>
                                <span className='text-dark fw-bold d-block'> 04th Mar 2023 | 11:00AM</span>
                            </td>
                            <td className=''>
                                <a href='javascript:void(0)' className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'>
                                    <img src={toAbsoluteUrl('/media/icons/estate/edit_icon.svg')} className='' alt=''/>
                                </a>
                                <a href='javascript:void(0)' className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'>
                                    <img src={toAbsoluteUrl('/media/icons/estate/more_icon.svg')} className='' alt=''/>
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span className='text-dark fw-bold d-block'>5</span>
                            </td>
                            <td>
                                <div className='d-flex align-items-center'>
                                    <div className='symbol symbol-40px me-5'>
                                        <img
                                            src={toAbsoluteUrl('/media/stock/600x400/img-5.jpg')}
                                            className='rounded-circle'
                                            alt=''
                                        />
                                    </div>
                                    <div className='d-flex justify-content-start flex-column'>
                                        <a href='javascript:void(0)' className='text-dark fw-bold'>
                                            Basheer
                                        </a>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <span className='text-dark fw-bold d-block'>Grade B</span>
                            </td>
                            <td>
                                <span className='text-dark fw-bold d-block'>2,00,000</span>
                            </td>
                            <td>
                                <span className='text-dark fw-bold d-block'> 12th June 2023 | 11:00AM</span>
                            </td>
                            <td className=''>
                                <a href='javascript:void(0)' className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'>
                                    <img src={toAbsoluteUrl('/media/icons/estate/edit_icon.svg')} className='' alt=''/>
                                </a>
                                <a href='javascript:void(0)' className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'>
                                    <img src={toAbsoluteUrl('/media/icons/estate/more_icon.svg')} className='' alt=''/>
                                </a>
                            </td>
                        </tr>
                    </tbody>
                    {/* end::Table body */}
                </table>
                {/* end::Table */}
                </div>
                {/* end::Table container */}
            </div>
            {/* begin::Body */}
            </div>
        </>
    )
}

export function CalculatorNew() {
    return (
        <>
            <div className='card align_card'>
                <div className='mycalculator border-0 pt-6 pb-3'>
                    <h3 className='estate-title d-flex align-items-start flex-column'>
                        <span className='mb-1 d-block'>My Calculator</span>
                        <span className='text-muted mt-2 d-block'>Estimate how much you could be paying for your repayment mortgage during and after your initial term.</span>
                    </h3>
                    <div className='card-toolbar'>
                        <CalculatorNewModal />
                    </div>
                </div>
            </div>
            <div className='card'>
                <div className='card-body bor_bot'>
                    <div className='row'>
                        <div className='col-lg-5 col-md-4'>
                            <span className='d-block sub_title'>Property Information</span>
                            <div className='d-flex'>
                                <div className='bx_shad'>
                                    <div className='d-flex'>                                      
                                        <div className='d-flex justify-content-start flex-column'>
                                            <span className='prop_title'>Area</span>
                                            <span className='prop_con'>Chennai</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='bx_shad'>
                                    <div className='d-flex'>                                      
                                        <div className='d-flex justify-content-start flex-column'>
                                            <span className='prop_title'>Flooring Type</span>
                                            <span className='prop_con'>2 Bhk</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='d-flex'>
                                <div className='bx_shad'>
                                    <div className='d-flex'>                                      
                                        <div className='d-flex justify-content-start flex-column'>
                                            <span className='prop_title'>Square Feet</span>
                                            <span className='prop_con'>1080</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='bx_shad'>
                                    <div className='d-flex'>                                      
                                        <div className='d-flex justify-content-start flex-column'>
                                            <span className='prop_title'>Grade</span>
                                            <span className='prop_con'>A</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <span className='recalculate'>Re-calculate</span>
                        </div>
                        <div className='col-lg-7 col-md-8'>
                            <span className='d-block sub_title'>Cost Chart View</span>
                        </div>
                    </div>
                </div>
                <div className='card-body'>
                    <span className='d-block sub_title1'>Description & Pricing</span>
                    <div className='table-responsive desc_table'>
                    {/* begin::Table */}
                        <table className='table align-middle gy-4'>
                        {/* begin::Table head */}
                            <tbody>
                                <tr className=''>
                                    <td className='text-center'>
                                        <span className='d-block'><img src={toAbsoluteUrl('/media/icons/estate/drag_icon.svg')} className='drag_icon' alt=''/></span>
                                    </td>
                                    <td>
                                        <div className='d-flex'>
                                            <img src={toAbsoluteUrl('/media/icons/estate/drop_arrow.svg')} className='me-3 wid10' alt=''/>
                                            <span className='text-dark fw-medium font17'>Demolition & Disposal</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='d-flex'>
                                            <span className='text-dark fw-bold'>1</span>
                                            <span className='text-light fw-medium'>Labor Cost</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='d-flex'>
                                            <span className='text-dark fw-bold'>3</span>
                                            <span className='text-light fw-medium'>Material Costs</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='d-flex'>
                                            <span className='text-dark fw-bold'>1</span>
                                            <span className='text-light fw-medium'>Other Costs</span>
                                        </div>
                                    </td>
                                    <td>
                                        <span className='plusadd'><img src={toAbsoluteUrl('/media/icons/estate/plus_icon.svg')} className='me-2 wid10' alt=''/> Add</span>
                                    </td>
                                    <td>
                                        <span className='text-dark fw-medium font14'>$10,470.93 T</span>
                                    </td>
                                    <td className='text-center'>
                                        <span className='d-block'><img src={toAbsoluteUrl('/media/icons/estate/more_drop_icon.svg')} className='wid3' alt=''/></span>
                                    </td>
                                </tr>
                                <tr className=''>
                                    <td className='text-center'>
                                        <span className='d-block'><img src={toAbsoluteUrl('/media/icons/estate/drag_icon.svg')} className='drag_icon' alt=''/></span>
                                    </td>
                                    <td>
                                        <div className='d-flex'>
                                            <img src={toAbsoluteUrl('/media/icons/estate/drop_arrow.svg')} className='me-3 wid10' alt=''/>
                                            <span className='text-dark fw-medium font17'>Plumbing</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='d-flex'>
                                            <span className='text-dark fw-bold'>1</span>
                                            <span className='text-light fw-medium'>Labor Cost</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='d-flex'>
                                            <span className='text-dark fw-bold'>3</span>
                                            <span className='text-light fw-medium'>Material Costs</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='d-flex'>
                                            <span className='text-dark fw-bold'>1</span>
                                            <span className='text-light fw-medium'>Other Costs</span>
                                        </div>
                                    </td>
                                    <td>
                                        <span className='plusadd'><img src={toAbsoluteUrl('/media/icons/estate/plus_icon.svg')} className='me-2 wid10' alt=''/> Add</span>
                                    </td>
                                    <td>
                                        <span className='text-dark fw-medium font14'>$10,470.93 T</span>
                                    </td>
                                    <td className='text-center'>
                                        <span className='d-block'><img src={toAbsoluteUrl('/media/icons/estate/more_drop_icon.svg')} className='wid3' alt=''/></span>
                                    </td>
                                </tr>
                                <tr className=''>
                                    <td className='text-center'>
                                        <span className='d-block'><img src={toAbsoluteUrl('/media/icons/estate/drag_icon.svg')} className='drag_icon' alt=''/></span>
                                    </td>
                                    <td>
                                        <div className='d-flex'>
                                            <img src={toAbsoluteUrl('/media/icons/estate/drop_arrow.svg')} className='me-3 wid10' alt=''/>
                                            <span className='text-dark fw-medium font17'>Electrical</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='d-flex'>
                                            <span className='text-dark fw-bold'>1</span>
                                            <span className='text-light fw-medium'>Labor Cost</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='d-flex'>
                                            <span className='text-dark fw-bold'>3</span>
                                            <span className='text-light fw-medium'>Material Costs</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='d-flex'>
                                            <span className='text-dark fw-bold'>1</span>
                                            <span className='text-light fw-medium'>Other Costs</span>
                                        </div>
                                    </td>
                                    <td>
                                        <span className='plusadd'><img src={toAbsoluteUrl('/media/icons/estate/plus_icon.svg')} className='me-2 wid10' alt=''/> Add</span>
                                    </td>
                                    <td>
                                        <span className='text-dark fw-medium font14'>$10,470.93 T</span>
                                    </td>
                                    <td className='text-center'>
                                        <span className='d-block'><img src={toAbsoluteUrl('/media/icons/estate/more_drop_icon.svg')} className='wid3' alt=''/></span>
                                    </td>
                                </tr>
                                <tr className=''>
                                    <td className='text-center'>
                                        <span className='d-block'><img src={toAbsoluteUrl('/media/icons/estate/drag_icon.svg')} className='drag_icon' alt=''/></span>
                                    </td>
                                    <td>
                                        <div className='d-flex'>
                                            <img src={toAbsoluteUrl('/media/icons/estate/drop_arrow.svg')} className='me-3 wid10' alt=''/>
                                            <span className='text-dark fw-medium font17'>Drywall & Paint</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='d-flex'>
                                            <span className='text-dark fw-bold'>1</span>
                                            <span className='text-light fw-medium'>Labor Cost</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='d-flex'>
                                            <span className='text-dark fw-bold'>3</span>
                                            <span className='text-light fw-medium'>Material Costs</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='d-flex'>
                                            <span className='text-dark fw-bold'>1</span>
                                            <span className='text-light fw-medium'>Other Costs</span>
                                        </div>
                                    </td>
                                    <td>
                                        <span className='plusadd'><img src={toAbsoluteUrl('/media/icons/estate/plus_icon.svg')} className='me-2 wid10' alt=''/> Add</span>
                                    </td>
                                    <td>
                                        <span className='text-dark fw-medium font14'>$10,470.93 T</span>
                                    </td>
                                    <td className='text-center'>
                                        <span className='d-block'><img src={toAbsoluteUrl('/media/icons/estate/more_drop_icon.svg')} className='wid3' alt=''/></span>
                                    </td>
                                </tr>
                                <tr className=''>
                                    <td className='text-center'>
                                        <span className='d-block'><img src={toAbsoluteUrl('/media/icons/estate/drag_icon.svg')} className='drag_icon' alt=''/></span>
                                    </td>
                                    <td>
                                        <div className='d-flex'>
                                            <img src={toAbsoluteUrl('/media/icons/estate/drop_arrow.svg')} className='me-3 wid10' alt=''/>
                                            <span className='text-dark fw-medium font17'>Electrical</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='d-flex'>
                                            <span className='text-dark fw-bold'>1</span>
                                            <span className='text-light fw-medium'>Labor Cost</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='d-flex'>
                                            <span className='text-dark fw-bold'>3</span>
                                            <span className='text-light fw-medium'>Material Costs</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='d-flex'>
                                            <span className='text-dark fw-bold'>1</span>
                                            <span className='text-light fw-medium'>Other Costs</span>
                                        </div>
                                    </td>
                                    <td>
                                        <span className='plusadd'><img src={toAbsoluteUrl('/media/icons/estate/plus_icon.svg')} className='me-2 wid10' alt=''/> Add</span>
                                    </td>
                                    <td>
                                        <span className='text-dark fw-medium font14'>$10,470.93 T</span>
                                    </td>
                                    <td className='text-center'>
                                        <span className='d-block'><img src={toAbsoluteUrl('/media/icons/estate/more_drop_icon.svg')} className='wid3' alt=''/></span>
                                    </td>
                                </tr>
                                <tr className=''>
                                    <td className='text-center'>
                                        <span className='d-block'><img src={toAbsoluteUrl('/media/icons/estate/drag_icon.svg')} className='drag_icon' alt=''/></span>
                                    </td>
                                    <td>
                                        <div className='d-flex'>
                                            <img src={toAbsoluteUrl('/media/icons/estate/drop_arrow.svg')} className='me-3 wid10' alt=''/>
                                            <span className='text-dark fw-medium font17'>Drywall & Paint</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='d-flex'>
                                            <span className='text-dark fw-bold'>1</span>
                                            <span className='text-light fw-medium'>Labor Cost</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='d-flex'>
                                            <span className='text-dark fw-bold'>3</span>
                                            <span className='text-light fw-medium'>Material Costs</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='d-flex'>
                                            <span className='text-dark fw-bold'>1</span>
                                            <span className='text-light fw-medium'>Other Costs</span>
                                        </div>
                                    </td>
                                    <td>
                                        <span className='plusadd'><img src={toAbsoluteUrl('/media/icons/estate/plus_icon.svg')} className='me-2 wid10' alt=''/> Add</span>
                                    </td>
                                    <td>
                                        <span className='text-dark fw-medium font14'>$10,470.93 T</span>
                                    </td>
                                    <td className='text-center'>
                                        <span className='d-block'><img src={toAbsoluteUrl('/media/icons/estate/more_drop_icon.svg')} className='wid3' alt=''/></span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className='recalculate_bottom bg-white p-5 mt-2'>
                <div className='position'>
                    <div className='row'>
                        <div className='col-lg-2'>
                            <div className='d-flex align-items-center'>
                                <div className='d-flex flex-column'>
                                    <span className='d-block bottom_title'>Company Labor Costs</span>
                                    <span className='d-block sub_amt'>$9,325.00</span>
                                    <span className='d-block sub_percent'>40%</span>
                                </div>
                                <div className='ms-auto'>
                                    <img src={toAbsoluteUrl('/media/icons/estate/plus_black.svg')} className='' alt=''/>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-2'>
                            <div className='d-flex align-items-center'>
                                <div className='d-flex flex-column'>
                                    <span className='d-block bottom_title'>Company Material Costs</span>
                                    <span className='d-block sub_amt'>$9,325.00</span>
                                    <span className='d-block sub_percent'>14%</span>
                                </div>
                                <div className='ms-auto'>
                                    <img src={toAbsoluteUrl('/media/icons/estate/plus_black.svg')} className='' alt=''/>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-2'>
                            <div className='d-flex align-items-center'>
                                <div className='d-flex flex-column'>
                                    <span className='d-block bottom_title'>Other Company Costs</span>
                                    <span className='d-block sub_amt'>$225.00</span>
                                    <span className='d-block sub_percent'>14%</span>
                                </div>
                                <div className='ms-auto'>
                                    <img src={toAbsoluteUrl('/media/icons/estate/bar_icon.svg')} className='' alt=''/>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-2'>
                            <div className='d-flex flex-column'>
                                <span className='d-block bottom_title'>Total Company Costs</span>
                                <span className='d-block sub_amt'>$45,6320</span>
                                <span className='d-block sub_percent'>45%</span>
                            </div>
                        </div>
                        <div className='col-lg-2'>
                            <span className='d-block estimate'>Estimated Gross Profit</span>
                            <span className='d-block estimate_amt'>$16,325.59</span>
                            <div className='row'>
                                <div className='col-6'>
                                    <span className='d-block bottom_title'>Makeup</span>
                                    <span className='d-block sub_amt'>125%</span>
                                </div>
                                <div className='col-6'>
                                    <span className='d-block bottom_title'>Margin</span>
                                    <span className='d-block sub_amt'>55%</span>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-2'>
                            <div className='d-flex justify-content-between'>
                                <span className='tax_title'>Taxable subtotal</span>
                                <span className='tax_amt'>$25,643.41</span>
                            </div>
                            <div className='d-flex justify-content-between'>
                                <span className='tax_title'>Tax 10% <img src={toAbsoluteUrl('/media/icons/estate/tax_edit.svg')} className='tax_edit' alt=''/></span>
                                <span className='tax_amt'>$5,002.25</span>
                            </div>
                            <div className='d-flex justify-content-between'>
                                <span className='tax_title font18'>Estimated Total</span>
                                <span className='tax_amt font18 font-weight-700'>$30,645.61</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export function CalculatorNewModal() {
    return (
        <>
        <button type="button" className='btn' data-bs-toggle="modal" data-bs-target="#kt_modal_1">
            <img src={toAbsoluteUrl('/media/icons/estate/plus_icon.svg')} className='me-4' alt=''/> Calculate New
        </button>
        <div className="modal fade estateModal" tabIndex={-1} id="kt_modal_1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h3 className='estate-title d-flex align-items-start flex-column'>
                            <span className='mb-1 d-block'>Property Calculator</span>
                            <span className='text-muted mt-2 d-block'>Estimate how much you could be paying for your repayment mortgage during and after your initial term.</span>
                        </h3>
                        <div className="btn btn-icon btn-sm btn-active-light-primary ms-2" data-bs-dismiss="modal" aria-label="Close">
                            <KTSVG path="/media/icons/duotune/arrows/arr061.svg" className="svg-icon svg-icon-2x"/>
                        </div>
                    </div>
                    <div className="modal-body">
                        <div className='calculator_form'>
                            <div className='grade_radio d-flex align-items-center'>
                                <div className='d-flex grade_radio_col'>
                                    <input type="radio" name="grade" id="gradeA" />
                                    <label htmlFor='gradeA'>
                                        Grade A
                                    </label>
                                </div>
                                <div className='d-flex grade_radio_col'>
                                    <input type="radio" name="grade" id="gradeB" />
                                    <label htmlFor='gradeB'>
                                        Grade B
                                    </label>
                                </div>
                                <div className='d-flex grade_radio_col'>
                                    <input type="radio" name="grade" id="gradeC" />
                                    <label htmlFor='gradeC'>
                                        Grade C
                                    </label>
                                </div>
                            </div>
                            <div className='row mb-6'>
                                <div className='col-lg-4'>
                                    <label className='form-label'>Area Cost</label>
                                    <div className='position-relative'>
                                        <input type="text" className='form-control pl45' />
                                        <span className='position-absolute ru_bg bor_leftR'>₹</span>
                                    </div>
                                </div>
                                <div className='col-lg-4'>
                                    <label className='form-label'>Your Deposit</label>
                                    <div className='position-relative'>
                                        <input type="text" className='form-control pl45' />
                                        <span className='position-absolute ru_bg bor_leftR'>₹</span>
                                    </div>
                                </div>
                            </div>
                            <div className='row mb-6'>
                                <div className='col-lg-4'>
                                    <label className='form-label'>Flooring tiles</label>
                                    <div className='position-relative'>
                                        <input type="text" className='form-control pr80' />
                                        <span className='position-absolute ru_bg wid70 bor_leftL'>wall</span>
                                    </div>
                                </div>
                                <div className='col-lg-4'>
                                    <label className='form-label'>Flooring tiles (other)</label>
                                    <div className='position-relative'>
                                        <input type="text" className='form-control pr80' />
                                        <span className='position-absolute ru_bg wid70 bor_leftL'>kitchen</span>
                                    </div>
                                </div>
                                <div className='col-lg-4'>
                                    <label className='form-label'>Flooring fees</label>
                                    <div className='position-relative'>
                                        <input type="text" className='form-control pl45' />
                                        <span className='position-absolute ru_bg bor_leftR'>₹</span>
                                    </div>
                                </div>
                            </div>
                            <div className='row mb-6'>
                                <div className='col-lg-4'>
                                    <label className='form-label d-flex align-items-center'>
                                        <span>Square feet cost</span>
                                        <img src={toAbsoluteUrl('/media/icons/estate/hint_icon.svg')} alt="" className='hint_icon' />
                                    </label>
                                    <div className='position-relative'>
                                        <input type="text" className='form-control pl45' />
                                        <span className='position-absolute ru_bg bor_leftR'>₹</span>
                                    </div>
                                </div>
                                <div className='col-lg-4'>
                                    <label className='form-label d-flex align-items-center'>
                                        <span>Fixed term interest rate</span>
                                        <img src={toAbsoluteUrl('/media/icons/estate/hint_icon.svg')} alt="" className='hint_icon' />
                                    </label>
                                    <div className='position-relative'>
                                        <input type="text" className='form-control' />
                                        <span className='position-absolute ru_bg bor_leftL pr45'>%</span>
                                    </div>
                                </div>
                                <div className='col-lg-4'>
                                    <label className='form-label d-flex align-items-center'>
                                        <span>Referral benefits</span>
                                        <img src={toAbsoluteUrl('/media/icons/estate/hint_icon.svg')} alt="" className='hint_icon' />
                                    </label>
                                    <div className='referral_radio row align-items-center'>
                                        <div className='col-6 d-flex referral_radio_col'>
                                            <input type="radio" name="referral" id="referralYes" />
                                            <label htmlFor='referralYes'>
                                                <span className='radio_check'></span>
                                                Yes
                                            </label>
                                        </div>
                                        <div className='col-6 d-flex referral_radio_col'>
                                            <input type="radio" name="referral" id="referralNo" />
                                            <label htmlFor='referralNo'>
                                                <span className='radio_check'></span>
                                                No
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='borrow'>
                                <span className='d-block'>Borrowing <span className='color_141824'>₹ 212,500</span> and repaying over 25 years with a <span className='color_141824'>5 year fixed rate.</span></span>
                            </div>
                            <div className='form_box'>
                                <div className='row'>
                                    <div className='col-lg-3 col-md-6'>
                                        <span className='d-block form_box_title'>63 months of</span>
                                        <span className='d-block form_box_con'>₹ 893.47</span>
                                    </div>
                                    <div className='col-lg-3 col-md-6 border-left'>
                                        <span className='d-block form_box_title'>237 months of</span>
                                        <span className='d-block form_box_con'>₹ 1,083.40</span>
                                    </div>
                                    <div className='col-lg-3 col-md-6 border-left'>
                                        <span className='form-label form_box_title d-flex'>
                                            <span>APRC</span>
                                            <img src={toAbsoluteUrl('/media/icons/estate/hint_icon.svg')} alt="" className='hint_icon' />
                                        </span>
                                        <span className='d-block form_box_con'>3.3%</span>
                                    </div>
                                    <div className='col-lg-3 col-md-6 border-left'>
                                        <span className='form-label form_box_title d-flex'>
                                            <span>Initial term cost</span>
                                            <img src={toAbsoluteUrl('/media/icons/estate/hint_icon.svg')} alt="" className='hint_icon' />
                                        </span>
                                        <span className='d-block form_box_con'>₹ 54,618</span>
                                    </div>
                                </div>
                            </div>
                            <div className='form_btn'>
                                <button type='submit' className='btn btn-primary'>Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
