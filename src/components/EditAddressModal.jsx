import { Fragment, useState } from 'react';
import Axios from 'axios';
import { API_URL } from '../assets/constants';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import '../assets/styles/NewAddressModal.css';
import { AiOutlineClose, AiOutlineInfoCircle } from 'react-icons/ai';
import { Dialog, Transition } from '@headlessui/react';
import { toast } from 'react-toastify';

const EditAddressModal = ({ openEdit, setOpenEdit, address, setAddresses, currentPage, setMaxPage }) => {
  const formik = useFormik({
    initialValues: {
      address: address.address,
      city: address.city,
      province: address.province,
      country: address.country,
      postalcode: address.postalcode,
      is_default: address.is_default,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      address: Yup.string().required('This field is required'),
      city: Yup.string().required('This field is required'),
      province: Yup.string().required('This field is required'),
      country: Yup.string().required('This field is required'),
      postalcode: Yup.string().length(5, 'Invalid postal code').required('This field is required'),
      is_default: Yup.boolean(),
    }),
    onSubmit: async (values) => {
      try {
        const response = await Axios.patch(
          `${API_URL}/address/edit/${address.id}`,
          { values: { ...values, postalcode: parseInt(values.postalcode) }, userId: address.userId, limit: 10, currentPage },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('userToken')}`,
            },
          }
        );

        setAddresses(response.data.rows);
        setMaxPage(Math.ceil(response.data.count / 10) || 1);
        toast.success(response.data.message, { position: 'bottom-left', theme: 'colored' });

        setOpenEdit(false);
      } catch (err) {
        toast.error('Unable to edit address!', { position: 'bottom-left', theme: 'colored' });
      }
    },
  });

  return (
    <>
      <Transition appear show={openEdit} as={Fragment}>
        <Dialog onClose={() => setOpenEdit(false)} className="fixed inset-0 min-h-screen flex items-center justify-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-90 -translate-y-2"
            enterTo="opaciy-100 translate-y-0"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-90 -translate-y-2"
          >
            <div className="w-1/3 h-max bg-white rounded-xl z-20 ring ring-offset-2 ring-sky-400 ring-inset flex flex-col addressModalBody">
              <div className="py-8 flex justify-center relative">
                <span className="text-2xl font-bold bg-gradient-to-r from-sky-500 to-sky-400 bg-clip-text text-transparent">
                  Edit Address
                </span>
                <button
                  onClick={() => {
                    setOpenEdit(false);
                    formik.resetForm();
                  }}
                  className="text-2xl top-4 right-4 text-sky-400 absolute active:scale-75 transiton focus:outline-none"
                >
                  <AiOutlineClose />
                </button>
              </div>
              <form onSubmit={formik.handleSubmit} className="mb-7">
                <div className="w-full px-12 flex flex-col">
                  <div className="w-full h-[90px]">
                    <div className="w-full border border-sky-500 border-opacity-30 rounded-xl p-2 flex flex-col relative">
                      <label className="font-bold text-sky-500 absolute -top-4 px-1 bg-white">Address:</label>
                      <div className="w-full relative">
                        <input
                          type="text"
                          id="address"
                          value={formik.values.address}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          placeholder="eg: Jl. Metro Alam IV No.10 PL-14;"
                          className={`w-full h-9 rounded-lg px-3 focus:outline-none border ${
                            formik.touched.address && formik.errors.address
                              ? 'border-rose-300 pr-7'
                              : 'border-slate-300 focus:border-sky-300'
                          }  placeholder:text-slate-300 transition`}
                        />
                        {formik.touched.address && formik.errors.address ? (
                          <AiOutlineInfoCircle className="absolute top-[10px] right-3 text-rose-300" />
                        ) : null}
                      </div>
                    </div>
                    {formik.touched.address && formik.errors.address ? (
                      <span className="pl-4 text-xs text-rose-400">{formik.errors.address}</span>
                    ) : null}
                  </div>
                  <div className="w-full flex justify-between">
                    <div className="w-[60%] h-[90px]">
                      <div className="w-full border border-sky-500 border-opacity-30 rounded-xl p-2 flex flex-col relative">
                        <label className="font-bold text-sky-500 absolute -top-4 px-1 bg-white">City:</label>
                        <div className="w-full relative">
                          <input
                            type="text"
                            id="city"
                            value={formik.values.city}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Jakarta Selatan;"
                            className={`w-full h-9 rounded-lg px-3 focus:outline-none border ${
                              formik.touched.city && formik.errors.city ? 'border-rose-300 pr-7' : 'border-slate-300 focus:border-sky-300'
                            }  placeholder:text-slate-300 transition`}
                          />
                          {formik.touched.city && formik.errors.city ? (
                            <AiOutlineInfoCircle className="absolute top-[10px] right-3 text-rose-300" />
                          ) : null}
                        </div>
                      </div>
                      {formik.touched.city && formik.errors.city ? (
                        <span className="pl-4 text-xs text-rose-400">{formik.errors.city}</span>
                      ) : null}
                    </div>
                    <div className="w-[36%] h-[90px]">
                      <div className="w-full border border-sky-500 border-opacity-30 rounded-xl p-2 flex flex-col relative">
                        <label className="font-bold text-sky-500 absolute -top-4 px-1 bg-white">Postal Code:</label>
                        <div className="w-full relative">
                          <input
                            type="number"
                            id="postalcode"
                            value={formik.values.postalcode}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="eg: 16969;"
                            className={`w-full h-9 rounded-lg px-3 focus:outline-none border ${
                              formik.touched.postalcode && formik.errors.postalcode
                                ? 'border-rose-300 pr-7'
                                : 'border-slate-300 focus:border-sky-300'
                            }  placeholder:text-slate-300 transition`}
                          />
                          {formik.touched.postalcode && formik.errors.postalcode ? (
                            <AiOutlineInfoCircle className="absolute top-[10px] right-3 text-rose-300" />
                          ) : null}
                        </div>
                      </div>
                      {formik.touched.postalcode && formik.errors.postalcode ? (
                        <span className="pl-2 text-xs text-rose-400">{formik.errors.postalcode}</span>
                      ) : null}
                    </div>
                  </div>
                  <div className="w-full h-[90px]">
                    <div className="w-full border border-sky-500 border-opacity-30 rounded-xl p-2 flex flex-col relative">
                      <label className="font-bold text-sky-500 absolute -top-4 px-1 bg-white">Province:</label>
                      <div className="w-full relative">
                        <input
                          placeholder="DKI Jakarta;"
                          type="text"
                          id="province"
                          value={formik.values.province}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className={`w-full h-9 rounded-lg px-3 focus:outline-none border ${
                            formik.touched.province && formik.errors.province
                              ? 'border-rose-300 pr-7'
                              : 'border-slate-300 focus:border-sky-300'
                          }  placeholder:text-slate-300 transition`}
                        />
                        {formik.touched.province && formik.errors.province ? (
                          <AiOutlineInfoCircle className="absolute top-[10px] right-3 text-rose-300" />
                        ) : null}
                      </div>
                    </div>
                    {formik.touched.province && formik.errors.province ? (
                      <span className="pl-4 text-xs text-rose-400">{formik.errors.province}</span>
                    ) : null}
                  </div>
                  <div className="w-full h-[80px]">
                    <div className="w-full border border-sky-500 border-opacity-30 rounded-xl p-2 flex flex-col relative">
                      <label className="font-bold text-sky-500 absolute -top-4 px-1 bg-white">Country:</label>
                      <div className="w-full relative">
                        <input
                          type="text"
                          placeholder="Indonesia;"
                          id="country"
                          value={formik.values.country}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className={`w-full h-9 rounded-lg px-3 focus:outline-none border ${
                            formik.touched.country && formik.errors.country
                              ? 'border-rose-300 pr-7'
                              : 'border-slate-300 focus:border-sky-300'
                          }  placeholder:text-slate-300 transition`}
                        />
                        {formik.touched.country && formik.errors.country ? (
                          <AiOutlineInfoCircle className="absolute top-[10px] right-3 text-rose-300" />
                        ) : null}
                      </div>
                    </div>
                    {formik.touched.country && formik.errors.country ? (
                      <span className="pl-4 text-xs text-rose-400">{formik.errors.country}</span>
                    ) : null}
                  </div>
                  <div className="w-full pt-1 pb-5 flex justify-center items-center gap-2">
                    <input
                      id="is_default"
                      type="checkbox"
                      checked={formik.values.is_default}
                      value={formik.values.is_default}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="accent-emerald-400 rounded-lg"
                    />
                    <label htmlFor="is_default" className="text-sky-500 font-bold cursor-pointer">
                      Set as Default
                    </label>
                  </div>
                  <div className="flex justify-center">
                    <button
                      type="submit"
                      className="py-3 px-5 rounded-xl font-bold text-white bg-gradient-to-r from-sky-400 to-emerald-400 active:scale-95 transition hover:brightness-110"
                    >
                      Save Address
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
};

export default EditAddressModal;
