using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AMS.BUS.BusModels
{
    public class BaseModel<T>
    {
        private ExceptionHandle exception;
        public ExceptionHandle Exception
        {
            get
            {
                if (this.exception == null)
                {
                    return new ExceptionHandle();
                }
                return this.exception;
            }
            set
            {
                this.exception = value;
            }
        }
        public T Result { get; set; }
    }
}
