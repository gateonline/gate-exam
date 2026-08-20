const questions = [

/* =====================================================
   Q1 - MSQ
   ===================================================== */

{
    question:
        "A step-growth polymerization involves monomers with average functionality greater than 2.\n\nWhich consequences are possible?",

    options: [
        "Branching",
        "Gelation",
        "Crosslinking",
        "Formation of an exclusively linear polymer"
    ],

    answer: [0, 1, 2],

    type: "MSQ"
},


/* =====================================================
   Q2 - MCQ
   ===================================================== */

{
    question:
        "A metallocene catalyst with a symmetric, achiral (non-bridged) ligand geometry polymerizes propylene to give predominantly:",

    options: [
        "Isotactic polypropylene",
        "Syndiotactic polypropylene",
        "Atactic polypropylene",
        "Crosslinked polypropylene"
    ],

    answer: 2,

    type: "MCQ"
},


/* =====================================================
   Q3 - MCQ
   ===================================================== */

{
    question:
        "Among the options given, choose the most suitable compatibilizer for blending Polyvinylidene fluoride (PVDF) and Acrylonitrile butadiene styrene (ABS).",

    options: [
        "Styrene-acrylonitrile (SAN)",
        "Polybutadiene (PB)",
        "Polymethyl methacrylate (PMMA)",
        "Nylon 6"
    ],

    answer: 2,

    type: "MCQ"
},


/* =====================================================
   Q4 - MCQ
   ===================================================== */

{
    question:
        "A polymer blend has the following characteristics:\n\n- Poor impact strength\n- Large dispersed domains\n- High interfacial tension\n- Two glass transition temperatures\n\nWhich modification is most likely to improve the mechanical properties?",

    options: [
        "Increase processing temperature only.",
        "Add a suitable compatibilizer.",
        "Increase molecular weight of one polymer only.",
        "Increase filler loading."
    ],

    answer: 1,

    type: "MCQ"
},


/* =====================================================
   Q5 - MCQ
   ===================================================== */

{
    question:
        "A polymer waste stream is processed into a product whose performance is significantly lower than that of the original application, although the polymer remains chemically usable.\n\nThis process is best described as:",

    options: [
        "Upcycling",
        "Downcycling",
        "Feedstock recycling",
        "Energy recovery"
    ],

    answer: 1,

    type: "MCQ"
},


/* =====================================================
   Q6 - MCQ
   ===================================================== */

{
    question:
        "MBS or CPE is added to rigid PVC (uPVC) window profiles. The primary mechanism by which these impact modifiers toughen PVC is:",

    options: [
        "They plasticize PVC, lowering its Tg below room temperature",

        "Dispersed rubbery particles cavitate and initiate/terminate localized shear yielding and crazing, absorbing impact energy",

        "They co-crystallize with PVC, increasing crystallinity",

        "They crosslink the PVC matrix"
    ],

    answer: 1,

    type: "MCQ"
},


/* =====================================================
   Q7 - MCQ
   ===================================================== */

{
    question:
        "Match the following.\n\n" +
        "P. Glassy polymer under small strain\n" +
        "Q. Rubbery polymer\n" +
        "R. Stress relaxation\n" +
        "S. Plastic deformation\n\n" +
        "1. Entropy-driven elasticity\n" +
        "2. Bond stretching and bond-angle distortion\n" +
        "3. Excess free energy is dissipated with time\n" +
        "4. Irreversible chain slippage\n\n" +
        "Choose the correct option.",

    options: [
        "P-2, Q-1, R-3, S-4",
        "P-1, Q-2, R-3, S-4",
        "P-2, Q-4, R-1, S-3",
        "P-4, Q-1, R-2, S-3"
    ],

    answer: 0,

    type: "MCQ"
},


/* =====================================================
   Q8 - MSQ
   ===================================================== */

{
    question:
        "Which of the following statements are CORRECT?",

    options: [
        "SMC (sheet moulding compound) contains longer fibers than DMC/BMC, giving better mechanical properties",

        "SMC is matured (thickened using MgO) before moulding to reach a leather-like, handleable viscosity",

        "BMC/DMC are typically processed by compression, transfer, or injection moulding",

        "SMC is a thermoplastic prepreg that can be re-melted and reused"
    ],

    answer: [0, 1, 2],

    type: "MSQ"
},


/* =====================================================
   Q9 - NAT / NUMERICAL
   ===================================================== */

{
    question:
        "A free-radical polymerization is run at Rp = 2.0 × 10⁻⁴ mol L⁻¹ s⁻¹ with initiator concentration 0.01 mol/L. Midway, additional initiator is added to bring the concentration to 0.09 mol/L (monomer concentration unchanged). The new rate, in units of 10⁻⁴ mol L⁻¹ s⁻¹, is ________.",

    options: [
        "2.0",
        "4.0",
        "6.0",
        "8.0"
    ],

    answer: 2,

    type: "MCQ"
},


/* =====================================================
   Q10 - MCQ
   ===================================================== */

{
    question:
        "A polymer consists of only two molecular-weight fractions:\n\n" +
        "20% of the molecules have M = 10,000 g/mol\n" +
        "80% of the molecules have M = 50,000 g/mol\n\n" +
        "Calculate the weight-average molecular weight.",

    options: [
        "40,000 g/mol",
        "45,000 g/mol",
        "48,095 g/mol",
        "50,000 g/mol"
    ],

    answer: 2,

    type: "MCQ"
},


/* =====================================================
   Q11 - MCQ
   ===================================================== */

{
    question:
        "A polymer is modeled as a Maxwell element.\n\n" +
        "The instantaneous strain accounts for 25% of the total strain after 15 s under constant stress.\n\n" +
        "If the elastic modulus is 1200 MPa, determine the viscosity of the material.",

    options: [
        "3000 MPa·s",
        "4500 MPa·s",
        "6000 MPa·s",
        "9000 MPa·s"
    ],

    answer: 2,

    type: "MCQ"
},


/* =====================================================
   Q12 - MCQ
   ===================================================== */

{
    question:
        "A part has a projected area of 150 cm² and the cavity pressure during injection is 40 MPa. The minimum clamping force required, in tonnes (take 1 tonne-force = 9810 N), is ________ (round to nearest integer).",

    options: [
        "41 tonnes",
        "51 tonnes",
        "61 tonnes",
        "71 tonnes"
    ],

    answer: 2,

    type: "MCQ"
},


/* =====================================================
   Q13 - MCQ
   ===================================================== */

{
    question:
        "A polymer specimen absorbs 12 J of energy in a notched impact test. The specimen thickness is 4 mm.\n\n" +
        "The reported impact strength is defined as energy absorbed per unit thickness.\n\n" +
        "What is the impact strength?",

    options: [
        "3 J/mm",
        "48 J/mm",
        "3000 J/m",
        "Both A and C"
    ],

    answer: 3,

    type: "MCQ"
},


/* =====================================================
   Q14 - MCQ
   ===================================================== */

{
    question:
        "Which statement is most appropriate?",

    options: [
        "This is mechanical recycling because the polymers are physically separated.",

        "This is chemical/feedstock recycling involving thermal degradation.",

        "This is energy recovery because no chemical bonds are broken.",

        "This is primary recycling because the original polymers are recovered unchanged."
    ],

    answer: 1,

    type: "MCQ"
},


/* =====================================================
   Q15 - MCQ
   ===================================================== */

{
    question:
        "A polymer capacitor has a dielectric material with dielectric constant εr = 4. The electric field inside the material is 2 × 10⁶ V/m.\n\n" +
        "If ε0 = 8.85 × 10⁻¹² F/m, the magnitude of the electric displacement D is closest to:",

    options: [
        "7.08 × 10⁻⁵ C/m²",
        "1.77 × 10⁻⁵ C/m²",
        "8.85 × 10⁻⁶ C/m²",
        "4.52 × 10⁻⁵ C/m²"
    ],

    answer: 0,

    type: "MCQ"
}

];
