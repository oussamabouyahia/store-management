const queries = {
  clientPay: `SELECT 
  s.id,
  s.total_amount, 
  s.client_name, 
  SUM(p.amount_paid) AS total_paid, 
  (s.total_amount - SUM(p.amount_paid)) AS remaining_unpaid,
  s.sale_date AS Date
FROM 
  sales_summary AS s
LEFT JOIN 
  payments AS p 
ON 
  s.id = p.sale_id
WHERE 
  s.client_name = :clientName

GROUP BY 
  s.id, s.total_amount, s.client_name`,

  salesByClient: `SELECT 
    client_name,
    GROUP_CONCAT(id ORDER BY sale_date ASC SEPARATOR ', ') AS sales,
    GROUP_CONCAT(total_amount ORDER BY sale_date ASC SEPARATOR ', ') AS total_amounts,
    GROUP_CONCAT(sale_date ORDER BY sale_date ASC SEPARATOR ', ') AS sale_dates
FROM sales_summary
WHERE client_name IS NOT NULL
GROUP BY client_name;`,
};
module.exports = queries;
