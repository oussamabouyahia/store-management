const queries = {
  clientPay: `SELECT 
  s.total_amount, 
  s.client_name, 
  SUM(p.amount_paid) AS total_paid, 
  (s.total_amount - SUM(p.amount_paid)) AS remaining_unpaid
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
};
module.exports = queries;
