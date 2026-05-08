using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    /// <summary>
    /// Representa uma agência financeira.
    /// </summary>
    /// 
    [Table("Agencia")]
    public class Agencia
    {
        /// <summary>
        /// Identificador único da agência.
        /// </summary>
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Codigo { get; set; }

        /// <summary>
        /// Nome da agência.
        /// </summary>
        [Required]
        public string Nome { get; set; } = string.Empty;

        /// <summary>
        /// Cidade onde a agência está localizada.
        /// </summary>
        [Required]
        public string Cidade { get; set; } = string.Empty;

        /// <summary>
        /// Unidade federativa do estado da agência.
        /// </summary>
        [Required]
        public string EstadoUF { get; set; } = string.Empty;
    }
}
