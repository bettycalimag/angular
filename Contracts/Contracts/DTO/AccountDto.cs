using Contracts.Datapersist;
using Contracts.Models;
using Contracts.Utilites;
using Microsoft.EntityFrameworkCore;
using System;
using System.Text;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IO;

namespace Contracts.DTO
{
    public class AccountDto
    {
        public int Id { get; set; }
        public DateTime PaymentDate { get; set; }
        public string RentAmountPaid { get; set; }
        public string ElectricBillPaid { get; set; }
        public string WaterBillPaid { get; set; }
        public string Remarks { get; set; }
        public string MonthPaid { get; set; }
        public int TenantId { get; set; }
        public string TenantName { get; set; }

        public static AccountDto FromEntity(Account entity)
        {
            if (entity == null)
                return null;

            return new AccountDto
            {
                Id = entity.Id,
                RentAmountPaid = entity.RentAmountPaid,
                ElectricBillPaid = entity.ElectricBillPaid,
                WaterBillPaid = entity.WaterBillPaid,
                Remarks = entity.Remarks,
                MonthPaid = entity.MonthPaid,              
                PaymentDate = Utility.ConvertToUTC(entity.PaymentDate),
                TenantId = entity.Tenant.Id,
                TenantName = entity.Tenant.FirstName              
            };
        }

        public static async Task<AccountDto> FromEntity(int id, InfinityDataContext infinityDataContext)
        {
            var entity = await infinityDataContext.Accounts.FindAsync(id);

            if (entity == null) return null;

            return new AccountDto
            {
                Id = entity.Id,
                RentAmountPaid = entity.RentAmountPaid,
                ElectricBillPaid = entity.ElectricBillPaid,
                WaterBillPaid = entity.WaterBillPaid,
                Remarks = entity.Remarks,
                MonthPaid = entity.MonthPaid,
                PaymentDate = Utility.ConvertToUTC(entity.PaymentDate),
                TenantId = entity.Tenant.Id,
                TenantName = entity.Tenant.FirstName
            };
        }

        public static async Task<Account> ToEntity(AccountDto accountDto, InfinityDataContext infinityDataContext)
        {
            if (accountDto == null) return null;
            var entity = await infinityDataContext.Accounts.FindAsync(accountDto.Id);

            if (entity == null)
            {
                return new Account
                {
                    Id = accountDto.Id,
                    RentAmountPaid = accountDto.RentAmountPaid,
                    ElectricBillPaid = accountDto.ElectricBillPaid,
                    WaterBillPaid = accountDto.WaterBillPaid,
                    Remarks = accountDto.Remarks,
                    MonthPaid = accountDto.MonthPaid,
                    PaymentDate = Utility.ConvertToUTC(accountDto.PaymentDate),
                    Tenant = await infinityDataContext.Tenants.FirstOrDefaultAsync(i => i.Id == accountDto.TenantId)
                };
            }

            entity.Id = accountDto.Id;
            entity.RentAmountPaid = accountDto.RentAmountPaid;
            entity.ElectricBillPaid = accountDto.ElectricBillPaid;
            entity.WaterBillPaid = accountDto.WaterBillPaid;
            entity.Remarks = accountDto.Remarks;
            entity.MonthPaid = accountDto.MonthPaid;
            entity.PaymentDate = Utility.ConvertToUTC(accountDto.PaymentDate);
            entity.Tenant = await infinityDataContext.Tenants.FirstOrDefaultAsync(i => i.Id == accountDto.TenantId);

            return entity;
        }

        public static async Task<Account> ToEntity(int id, InfinityDataContext infinityDataContext)
        {
            var entity = await infinityDataContext.Accounts.FindAsync(id);

            if (entity == null)
            {
                return new Account
                {
                    Id = entity.Id,
                    RentAmountPaid = entity.RentAmountPaid,
                    ElectricBillPaid = entity.ElectricBillPaid,
                    WaterBillPaid = entity.WaterBillPaid,
                    Remarks = entity.Remarks,
                    MonthPaid = entity.MonthPaid,
                    PaymentDate = Utility.ConvertToUTC(entity.PaymentDate),
                    Tenant = await infinityDataContext.Tenants.FirstOrDefaultAsync(i => i.Id == entity.Tenant.Id)
                };
            }

            return entity;
        }

        public static async void ProcessWrite(InfinityDataContext infinityDataContext, int iMonat, string fileName)
        {
            var buffer = new StringBuilder();
            var accounts = await infinityDataContext.Accounts.Where(a => a.PaymentDate.Month == iMonat && a.PaymentDate.Year == DateTime.Now.Year).OrderBy(a => a.Tenant.RentedPlace.RentedName).ToListAsync();
           
            foreach (var account in accounts)
            {
                AccountDto.FormatTsqm(buffer, account);
            }

            buffer = AccountDto.FormatHeader().Append(buffer);

            await AccountDto.WriteTextAsync(fileName, buffer.ToString());
        }

        public static void FormatTsqm(StringBuilder buffer, Account tsqm)
        {
            if (tsqm != null)
            {
                buffer.AppendFormat($"{(tsqm.PaymentDate.ToString("dd.MM.yyyy hh:mm"))};");
                buffer.AppendFormat($"{tsqm.MonthPaid};");
                buffer.AppendFormat($"{tsqm.Tenant.FirstName + " " + tsqm.Tenant.LastName};");                
                buffer.AppendFormat($"{tsqm.RentAmountPaid};");
                buffer.AppendFormat($"{tsqm.Tenant.RentedPlace.RentedName};");
                buffer.Remove(buffer.Length - 1, 1);
                buffer.Append("\n");
            }
        }

        public static StringBuilder FormatHeader()
        {
            AccountDto tsqm = new AccountDto();
            StringBuilder str = new StringBuilder();
            
            foreach (var prop in tsqm.GetType().GetProperties())
            {

                if (prop.Name == "PaymentDate")
                { str.AppendFormat($"{prop.Name};"); }
                else if (prop.Name == "MonthPaid")
                { str.AppendFormat($"{prop.Name};"); }
                else if (prop.Name == "TenantName")
                { str.AppendFormat($"{prop.Name};"); }
                else if (prop.Name == "RentAmountPaid")
                { str.AppendFormat($"{prop.Name};"); }

            }

            //str.Remove(str.Length - 1, 1);
            str.Append("RentedName");            
            str.Append("\n");
            return str;
        }

        public static async Task WriteTextAsync(string filePath, string text)
        {
            byte[] encodedText = Encoding.Unicode.GetBytes(text);

            using (FileStream sourceStream = new FileStream(filePath + ".csv",
                FileMode.Create, FileAccess.Write, FileShare.None,
                bufferSize: 4096, useAsync: true))
            {
                await sourceStream.WriteAsync(encodedText, 0, encodedText.Length);
                sourceStream.Flush();
            };
        }
    }
}
