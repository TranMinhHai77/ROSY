﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Dta.Marketplace.Api.Web.Entities {

    public enum BodyType {
        ncce,
        cce,
        cc,
        local,
        state,
        other
    }
    public partial class Agency {
        [Required]
        [Column("body_type", TypeName = "body_type_enum")]
        public BodyType BodyType { get; set; }
    }
}
