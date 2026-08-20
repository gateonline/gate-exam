const questions = [

/* =====================================================
   Q1 — MCQ — 1 MARK
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

    answer: 0,

    /*
       For this MSQ, the correct combination is A, B, C.
       Therefore this question should actually be MSQ.
    */

    correctAnswers: [0, 1, 2],

    type: "MSQ",

    marks: 1
},


/* =====================================================
   Q2 — MCQ — 1 MARK
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

    type: "MCQ",

    marks: 1
},


/* =====================================================
   Q3 — MCQ — 1 MARK
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

    type: "MCQ",

    marks: 1
},


/* =====================================================
   Q4 — MCQ — 1 MARK
   ===================================================== */

{
    question:
        "A polymer blend has the following characteristics:\n\n" +
        "- Poor impact strength\n" +
        "- Large dispersed domains\n" +
        "- High interfacial tension\n" +
        "- Two glass transition temperatures\n\n" +
        "Which modification is most likely to improve the mechanical properties?",

    options: [
        "Increase processing temperature only.",
        "Add a suitable compatibilizer.",
        "Increase molecular weight of one polymer only.",
        "Increase filler loading."
    ],

    answer: 1,

    type: "MCQ",

    marks: 1
},


/* =====================================================
   Q5 — MCQ — 1 MARK
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

    type: "MCQ",

    marks: 1
},


/* =====================================================
   Q6 — MCQ — 1 MARK
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

    type: "MCQ",

    marks: 1
},


/* =====================================================
   Q7 — MCQ — 2 MARKS
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

    type: "MCQ",

    marks: 2
},


/* =====================================================
   Q8 — MSQ — 2 MARKS
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

    correctAnswers: [0, 1, 2],

    type: "MSQ",

    marks: 2
},


/* =====================================================
   Q9 — NAT — 2 MARKS
   ===================================================== */

{
    question:
        "A free-radical polymerization is run at Rp = 2.0 × 10⁻⁴ mol L⁻¹ s⁻¹ with initiator concentration 0.01 mol/L. Midway, additional initiator is added to bring the concentration to 0.09 mol/L (monomer concentration unchanged). The new rate, in units of 10⁻⁴ mol L⁻¹ s⁻¹, is ________.\n\n" +
        "Enter the answer correct to TWO decimal places.",

    type: "NAT",

    answer: 6.00,

    marks: 2
},


/* =====================================================
   Q10 — NAT — 2 MARKS
   ===================================================== */

{
    question:
        "A polymer consists of only two molecular-weight fractions:\n\n" +

        "20% of the molecules have M = 10,000 g/mol\n" +
        "80% of the molecules have M = 50,000 g/mol\n\n" +

        "Calculate the weight-average molecular weight in g/mol.\n\n" +

        "Enter the answer correct to TWO decimal places.",

    type: "NAT",

    answer: 48095.24,

    marks: 2
},


/* =====================================================
   Q11 — NAT — 2 MARKS
   ===================================================== */

{
    question:
        "A polymer is modeled as a Maxwell element.\n\n" +

        "The instantaneous strain accounts for 25% of the total strain after 15 s under constant stress.\n\n" +

        "If the elastic modulus is 1200 MPa, determine the viscosity of the material in MPa·s.\n\n" +

        "Enter the answer correct to TWO decimal places.",

    type: "NAT",

    answer: 6000.00,

    marks: 2
},


/* =====================================================
   Q12 — NAT — 2 MARKS
   ===================================================== */

{
    question:
        "A part has a projected area of 150 cm² and the cavity pressure during injection is 40 MPa. The minimum clamping force required, in tonnes (take 1 tonne-force = 9810 N), is ________.\n\n" +

        "Enter the answer correct to TWO decimal places.",

    type: "NAT",

    answer: 61.16,

    marks: 2
},


/* =====================================================
   Q13 — MCQ — 2 MARKS
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

    type: "MCQ",

    marks: 2
},


/* =====================================================
   Q14 — MCQ — 2 MARKS
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

    type: "MCQ",

    marks: 2
},


/* =====================================================
   Q15 — NAT — 2 MARKS
   ===================================================== */

{
    question:
        "A polymer capacitor has a dielectric material with dielectric constant εr = 4. The electric field inside the material is 2 × 10⁶ V/m.\n\n" +

        "If ε0 = 8.85 × 10⁻¹² F/m, calculate the magnitude of the electric displacement D in C/m².\n\n" +

        "Enter the answer correct to TWO decimal places.",

    type: "NAT",

    answer: 0.0000708,

    marks: 2
}

];
