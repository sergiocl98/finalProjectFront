import {
  ArrowUpDownIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ArrowLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowRightIcon,
} from '@chakra-ui/icons';
import {
  Box,
  Flex,
  IconButton,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
  useMediaQuery,
} from '@chakra-ui/react';
import React from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';

const TableSimple = ({
  columns,
  data,
  isSorty,
  variant = 'subTable',
  rowProps = () => {},
  ...props
}) => {
  const [greaterThan880] = useMediaQuery('(min-width: 880px)');

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, sortBy: [{ id: 'dateStart', desc: true }] },
    },
    useSortBy,
    usePagination
  );

  return (
    <>
      <Table
        variant={variant}
        color="#686868"
        width="100%"
        {...props}
        {...getTableProps()}
      >
        <Thead>
          {headerGroups.map(headerGroup => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <Th
                  p={0}
                  {...column.getHeaderProps(
                    isSorty && column.getSortByToggleProps()
                  )}
                >
                  <Flex justifyContent="center" alignItems="center">
                    {column.render('Header')}
                    {isSorty && !column.disableSortBy && (
                      <Box>
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <ChevronDownIcon w={4} h={4} color="brand.gray2" />
                          ) : (
                            <ChevronUpIcon w={4} h={4} color="brand.gray2" />
                          )
                        ) : (
                          <ArrowUpDownIcon w={3} h={3} color="brand.gray3" />
                        )}
                      </Box>
                    )}
                  </Flex>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row, index) => {
            prepareRow(row);
            return (
              <Tr key={index} {...row.getRowProps(rowProps(row))}>
                {row.cells.map(cell => {
                  return (
                    <Td p={"5px 0px "} {...cell.getCellProps()} {...cell.column.props}>
                      <Flex justifyContent={'center'} alignItems={'center'}>
                        {cell.render('Cell')}
                      </Flex>
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
        {props.children}
      </Table>
      <Flex justifyContent="space-between" m={4} alignItems="center">
        <Flex>
          {/* <Tooltip label="First Page">
            <IconButton
              onClick={() => gotoPage(0)}
              isDisabled={!canPreviousPage}
              icon={<ArrowLeftIcon h={3} w={3} />}
              mr={4}
            />
          </Tooltip> */}
          <Tooltip label="Previous Page">
            <IconButton
              onClick={previousPage}
              isDisabled={!canPreviousPage}
              icon={<ChevronLeftIcon h={6} w={6} />}
            />
          </Tooltip>
        </Flex>

        <Flex alignItems="center">
          {greaterThan880 && (
            <Text flexShrink="0" mr={8}>
              Page{' '}
              <Text fontWeight="bold" as="span">
                {pageIndex + 1}
              </Text>{' '}
              of{' '}
              <Text fontWeight="bold" as="span">
                {pageOptions.length}
              </Text>
            </Text>
          )}
          {greaterThan880 && <Text flexShrink="0">Go to page:</Text>}
          <NumberInput
            ml={2}
            mr={8}
            w={28}
            min={1}
            max={pageOptions.length}
            onChange={value => {
              const page = value ? value - 1 : 0;
              gotoPage(page);
            }}
            defaultValue={pageIndex + 1}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          {/* {greaterThan880 && <Select
            w={32}
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </Select>} */}
        </Flex>

        <Flex>
          <Tooltip label="Next Page">
            <IconButton
              onClick={nextPage}
              isDisabled={!canNextPage}
              icon={<ChevronRightIcon h={6} w={6} />}
            />
          </Tooltip>
          {/* <Tooltip label="Last Page">
            <IconButton
              onClick={() => gotoPage(pageCount - 1)}
              isDisabled={!canNextPage}
              icon={<ArrowRightIcon h={3} w={3} />}
              ml={4}
            />
          </Tooltip> */}
        </Flex>
      </Flex>
    </>
  );
};

export default TableSimple;
