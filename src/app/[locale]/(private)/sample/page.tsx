"use client";

import { LocaleSupport } from "@/enums";
import { debounce } from "@/helpers";
import { useLazyFetchListSamplesQuery } from "@/libraries/redux/features/sample/sampleApi";
import { useAppSelector } from "@/libraries/redux/hooks";
import { IPagination, ISample } from "@/types";
import { PAGINATION_CONFIG } from "@configs";
import {
  App,
  Button,
  Input,
  Spin,
  Table,
  TableProps,
  Typography,
  message,
} from "antd";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useIntl } from "react-intl";
import {
  SectionModalCreate,
  SectionModalDelete,
  SectionModalEdit,
} from "./_sections";

const TypeListPage = () => {
  const intl = useIntl();

  const appLocale = useAppSelector((state) => state.app.locale);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGINATION_CONFIG.DEFAULT_SIZE);
  const [fetchListSamples, { data, isLoading, isError }] =
    useLazyFetchListSamplesQuery();
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  // NOTE: Remove if use modal.confirm hook
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<ISample | null>(null);
  // const { message, modal } = App.useApp();
  const [messageApi, contextHolder] = message.useMessage();
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchListSamples({ all: false, page: currentPage, search: searchText });
  }, [fetchListSamples, currentPage, pageSize, searchText]);

  const columns: TableProps["columns"] = [
    {
      title: `${intl.formatMessage({ id: "name" })}`,
      dataIndex: "name",
      key: "name",
      onCell: () => ({
        style: { minWidth: 100, maxWidth: 250, whiteSpace: "nowrap" },
      }),
    },
    {
      title: `${intl.formatMessage({ id: "actions" })}`,
      key: "actions",
      width: appLocale == LocaleSupport.EN ? 130 : 200,
      onCell: () => ({
        style: { minWidth: 100, maxWidth: 150, textAlign: "center" },
      }),
      /* eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
      render: (_value: any, record: any, _index: number) => (
        <>
          <Button type="link" onClick={() => handleEditClick(record)}>
            {intl.formatMessage({ id: "edit" })}
          </Button>
          <Button type="link" danger onClick={() => handleDeleteClick(record)}>
            {intl.formatMessage({ id: "delete" })}
          </Button>
        </>
      ),
    },
  ];

  const debounceSetSearchText = debounce((query: string) => {
    setSearchText(query);
  });

  const handleCreateClick = () => {
    setCreateModalOpen(true);
  };

  const handleEditClick = (record: ISample) => {
    setSelectedType(record);
    setEditModalOpen(true);
  };

  const handleDeleteClick = (record: ISample) => {
    /* BUG: model.confirm is not a function.
     * Because antd is not well work with react 19
     * https://ant.design/docs/react/v5-for-19
     */
    /*
    modal.confirm({
      title: "Are you sure?",
      content: `Do you really want to delete "${record.name}"? This action cannot be undone.`,
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: () => {
        console.log("Deleting:", record);
        message.success(`"${record.name}" deleted successfully!`);
        // TODO: Add API call for actual deletion
      },
    });
    */
    setSelectedType(record);
    setDeleteModalOpen(true);
  };

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const handleTableChange: TableProps["onChange"] = (pagination) => {
    if (!pagination.current || !pagination.pageSize) {
      return;
    }
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
  };

  const listData = useAppSelector((state) => state.sample.lists);
  const totalCount = (data?.data as IPagination<ISample> | null)?.count || 0;

  if (isLoading) {
    return (
      <motion.div className="w-full h-full flex justify-center items-center">
        <Spin size="large" />
      </motion.div>
    );
  }
  if (isError) {
    messageApi.error("Failed to fetch data");
  }

  return (
    <>
      {contextHolder}
      <App>
        <div className="private-spending">
          <div className="flex justify-between items-center mb-4">
            <Typography.Title level={2} className="text-2xl font-semibold">
              {intl.formatMessage({ id: "spending_types" })}
            </Typography.Title>
          </div>
          <div className="top-area">
            <Input
              className="input-search"
              placeholder={`${intl.formatMessage({ id: "search" })}...`}
              onChange={(e) => debounceSetSearchText(e.target.value)}
              suffix={<IoSearchOutline />}
            />
            <Button type="primary" onClick={() => handleCreateClick()}>
              {intl.formatMessage({ id: "create" })}
            </Button>
          </div>
          <Table
            dataSource={listData}
            columns={columns}
            rowKey="id"
            bordered
            pagination={{
              current: currentPage,
              pageSize: pageSize,
              total: totalCount,
              showSizeChanger: false,
            }}
            onChange={handleTableChange}
            scroll={{ x: "max-content" }}
          />
        </div>
        <SectionModalCreate
          isModalOpen={createModalOpen}
          setIsModalOpenAction={setCreateModalOpen}
        />
        <SectionModalEdit
          record={selectedType}
          isModalOpen={editModalOpen}
          setIsModalOpenAction={setEditModalOpen}
        />
        <SectionModalDelete
          record={selectedType}
          isModalOpen={deleteModalOpen}
          setIsModalOpenAction={setDeleteModalOpen}
        />
      </App>
    </>
  );
};

export default TypeListPage;
