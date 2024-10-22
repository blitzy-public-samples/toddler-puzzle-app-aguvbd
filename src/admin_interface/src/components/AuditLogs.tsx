// Import necessary modules and components.
// Requirement Addressed: Facilitates the viewing and management of audit logs, allowing administrators to filter and paginate through logged actions.
// Location: Technical Specification/System Components/Logging and Monitoring

// External dependencies
import React, { useState, useEffect } from 'react'; // React library for building the component. Version: 17.0.2
import styled from 'styled-components'; // Utilities for defining and managing CSS-in-JS styles. Version: 5.3.3

// Internal dependencies
import { API_BASE_URL } from '../utils/Constants'; // Base URL for constructing API endpoints.
import logger from '../utils/Logger'; // Logs audit log operations and errors.
import validateInput from '../utils/Validator'; // Ensures input data is valid before processing.
import apiClient from '../services/ApiService'; // Handles HTTP requests to the backend server for audit log operations.
import GlobalStyles from '../styles/GlobalStyles'; // Ensures consistent styling across the component.
import Pagination from './Pagination'; // Provides pagination controls for navigating through audit logs.
import SearchFilter from './SearchFilter'; // Provides search and filter capabilities for audit logs.

// Apply global styles using GlobalStyles.
const Container = styled.div`
  ${GlobalStyles}
  padding: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  text-align: left;
  padding: 10px;
  border-bottom: 2px solid #ddd;
`;

const TableRow = styled.tr`
  &:hover {
    background-color: #f5f5f5;
  }
`;

const TableCell = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

/**
 * Renders the audit logs interface, displaying a list of logs and providing actions to filter and paginate them.
 * Requirement Addressed: Facilitates the viewing and management of audit logs, allowing administrators to filter and paginate through logged actions.
 * Location: Technical Specification/System Components/Logging and Monitoring
 *
 * @returns {JSX.Element} The rendered component.
 */
const AuditLogs: React.FC = () => {
  // Define state variables for managing log data and loading states.
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [logsPerPage] = useState<number>(10);
  const [filter, setFilter] = useState<string>('');

  // Fetch audit logs using apiClient on component mount and when dependencies change.
  useEffect(() => {
    fetchAuditLogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, filter]);

  // Function to fetch audit logs from the backend server.
  const fetchAuditLogs = async () => {
    setLoading(true);
    try {
      // Construct API endpoint with pagination and filtering.
      const endpoint = `${API_BASE_URL}/admin/audit-logs?page=${currentPage}&limit=${logsPerPage}&filter=${encodeURIComponent(
        filter
      )}`;
      // Validate the constructed endpoint.
      validateInput(endpoint);
      // Send GET request to the backend server.
      const response = await apiClient.get(endpoint);
      // Update logs state with the data received.
      setLogs(response.data.logs);
    } catch (error) {
      // Log any errors that occur during the fetch operation.
      logger.error('Error fetching audit logs:', error);
    } finally {
      // Update loading state to indicate fetch operation is complete.
      setLoading(false);
    }
  };

  // Handle filtering actions when the filter value changes.
  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    setCurrentPage(1);
  };

  // Handle pagination actions when the current page changes.
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Placeholder total logs count for pagination calculation.
  const totalLogs = 100; // This should be fetched from the server in a real implementation.
  const totalPages = Math.ceil(totalLogs / logsPerPage);

  return (
    <Container>
      {/* Render the SearchFilter component to provide search and filter capabilities. */}
      <SearchFilter onFilterChange={handleFilterChange} />
      {loading ? (
        // Display a loading message while fetching logs.
        <p>Loading audit logs...</p>
      ) : (
        <>
          {/* Render the table of audit logs. */}
          <Table>
            <thead>
              <tr>
                <TableHeader>Timestamp</TableHeader>
                <TableHeader>User</TableHeader>
                <TableHeader>Action</TableHeader>
                <TableHeader>Details</TableHeader>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, index) => (
                <TableRow key={index}>
                  <TableCell>{log.timestamp}</TableCell>
                  <TableCell>{log.user}</TableCell>
                  <TableCell>{log.action}</TableCell>
                  <TableCell>{log.details}</TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
          {/* Render the Pagination component to navigate through audit logs pages. */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </Container>
  );
};

export default AuditLogs;